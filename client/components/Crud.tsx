import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import toast from 'react-hot-toast'
import { AiFillEdit } from 'react-icons/ai'
import { FaTrash } from 'react-icons/fa'

interface ResponseData {
  id: number
  name: string
  phone: number
  email: number
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

const Crud = ({ isOpen, setIsOpen }: boolean | any) => {
  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<number | string>(0)
  const [gmail, setGmail] = useState<string | number>('')

  const [editName, setEditName] = useState<string>('')
  const [editPhone, setEditPhone] = useState<number | string>(0)
  const [editGmail, setEditGmail] = useState<string | number>('')
  const [editId, setEditId] = useState<string | number>('')

  const [users, setUsers] = useState<ResponseData[]>([])
  const [loading, setLoading] = useState(true)

  const [isEditModal, setIsEditModal] = useState<boolean>(false)

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenEditModal = () => {
    setIsEditModal(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModal(false)
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    try {
      const data = { name, phone, gmail }
      const response = await axios.post(
        'http://127.0.0.1:8080/api/v1/register',
        data
      )
      toast.success(response.data.message)
      handleCloseModal()
    } catch (error) {
      console.log(error)
    }

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

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
    if (confirmed)
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

  const getUserId = (id: string | number) => {
    handleOpenEditModal()
    setEditId(id)
  }

  const handleUpdateForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault()

    try {
      const data = { editName, editPhone, editGmail }

      const name = editName
      const phone = editPhone
      const gmail = editGmail
      const info = { name, phone, gmail }

      const response = await axios.put(
        `http://127.0.0.1:8080/api/v1/update-user/${editId}`,
        info
      )
      setIsEditModal(false)
      toast.success(response.data.message)
    } catch (err) {
      console.log(err)
    }

    setTimeout(() => {
      window.location.reload()
    }, 1000)
  }

  if (loading) return <div>Loading...</div>
  return (
    <section>
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

      {/* Update modal */}
      <Modal
        isOpen={isEditModal}
        onRequestClose={handleCloseEditModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <section className="flex flex-col mx-[30px] lg:mx-0 lg:items-center">
          <h1 className="font-bold mt-[30px]">Update User</h1>
          <form className="mt-[30px]" onSubmit={handleUpdateForm}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[500px] p-2.5"
                placeholder="name"
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your phone
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[500px] p-2.5"
                placeholder="061..."
                value={editPhone}
                onChange={(event) => setEditPhone(event.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[500px] p-2.5"
                placeholder="name@gmail.com"
                value={editGmail}
                onChange={(event) => setEditGmail(event.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:w-[500px] px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </section>
        <button
          onClick={handleCloseEditModal}
          className="absolute top-3 right-3"
        >
          Close
        </button>
      </Modal>

      {/* Register modal */}
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <section className="flex flex-col mx-[30px] lg:mx-0 lg:items-center">
          <h1 className="font-bold mt-[30px]">Register User</h1>
          <form className="mt-[30px]" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[500px] p-2.5"
                placeholder="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your phone
              </label>
              <input
                type="tel"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[500px] p-2.5"
                placeholder="061..."
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full lg:w-[500px] p-2.5"
                placeholder="name@gmail.com"
                value={gmail}
                onChange={(event) => setGmail(event.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:w-[500px] px-5 py-2.5 text-center"
            >
              Submit
            </button>
          </form>
        </section>
        <button onClick={handleCloseModal} className="absolute top-3 right-3">
          Close
        </button>
      </Modal>
    </section>
  )
}

export default Crud
