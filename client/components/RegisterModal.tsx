import { useState, useContext } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import toast from 'react-hot-toast'
import { MyContext } from '../context/MyContext'

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

const RegisterModal = () => {
  const context = useContext(MyContext)

  const { isOpen, handleCloseModal } = context

  const [name, setName] = useState<string>('')
  const [phone, setPhone] = useState<number | string>(0)
  const [gmail, setGmail] = useState<string | number>('')

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

  if (!context) return null

  return (
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
  )
}

export default RegisterModal
