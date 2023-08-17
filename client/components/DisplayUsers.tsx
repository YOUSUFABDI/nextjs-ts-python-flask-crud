import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AiFillEdit } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'
import { MyContext } from '../context/MyContext'

interface ResponseData {
  id: number
  name: string
  phone: number
  email: number
}

const DisplayUsers = () => {
  const [users, setUsers] = useState<ResponseData[]>([])
  const [loading, setLoading] = useState(true)

  const [searchUser, setSearchUser] = useState<number | string>('')
  const [searchedUser, setSearchedUser] = useState<
    ResponseData | undefined | any
  >()
  const [isSearchedUser, setIsSearchedUser] = useState<boolean>(false)

  const context = useContext(MyContext)
  const { getUserId } = context

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ResponseData[] | any>(
          'http://127.0.0.1:8080/api/v1/diplay-users'
        )
        const data = response.data.data
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.log('Error fetching data.')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDeleteUser = async (id: string | number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this user?'
    )
    if (!confirmed) return

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8080/api/v1/delete-user/${id}`
      )
      toast.success(response.data.message)
    } catch (err) {
      console.log(err)
    }

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  const handleSearchUser = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.get(
        `http://127.0.0.1:8080/api/v1/search-user/${searchUser}`
      )
      const data = response.data
      setIsSearchedUser(true)
      setSearchedUser(data.user)
      if (searchUser === data.user.id) {
        console.log('no')
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!context) return null

  return (
    <section>
      {/* Search user form */}
      <form onSubmit={handleSearchUser}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only "
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search user by id..."
            required
            value={searchUser}
            onChange={(event) => setSearchUser(event.target.value)}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      {/* Search user form */}

      {/* All users */}
      <div
        className={`relative overflow-x-auto mt-5 ${
          isSearchedUser && 'hidden'
        }`}
      >
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Gmail
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="bg-white" key={user.id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {user.id}
                </th>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <FaTrash
                    size="20"
                    className="hover:scale-90 transition-all duration-150 text-red-500"
                  />
                </td>
                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => getUserId(user.id)}
                >
                  <AiFillEdit
                    size="30"
                    className="hover:scale-90 transition-all duration-150 text-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* All users */}

      {/* Searched users */}
      <div
        className={`relative overflow-x-auto mt-5  ${
          isSearchedUser ? 'block' : 'hidden'
        }`}
      >
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Phone number
              </th>
              <th scope="col" className="px-6 py-3">
                Gmail
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                {/* {user.id} */}
                {searchedUser?.id}
              </th>
              <td className="px-6 py-4">{searchedUser?.name}</td>
              <td className="px-6 py-4">{searchedUser?.phone}</td>
              <td className="px-6 py-4">{searchedUser?.gmail}</td>
              <td className="px-6 py-4 cursor-pointer">
                <FaTrash
                  size="20"
                  className="hover:scale-90 transition-all duration-150 text-red-500"
                  onClick={() => handleDeleteUser(searchedUser.id)}
                />
              </td>
              <td className="px-6 py-4 cursor-pointer">
                <AiFillEdit
                  size="30"
                  className="hover:scale-90 transition-all duration-150 text-blue-500"
                  onClick={() => getUserId(searchedUser.id)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Searched users */}
    </section>
  )
}

export default DisplayUsers
