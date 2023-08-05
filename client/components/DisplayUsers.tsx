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

  if (loading) return <div>Loading...</div>
  if (!context) return null

  return (
    <section>
      <div className="relative overflow-x-auto">
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
    </section>
  )
}

export default DisplayUsers
