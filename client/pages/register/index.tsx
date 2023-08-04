import Modal from 'react-modal'
import Crud from './../../components/Crud'
import { useContext } from 'react'
import { MyContext } from '../MyContext'

Modal.setAppElement('#__next')

const RegisterUser = () => {
  const context: any = useContext(MyContext)

  const { handleOpenModal, isOpen, setIsOpen } = context

  if (!context) return null

  return (
    <main className="flex flex-col gap-[15px] ml-[30px]">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full lg:w-[200px] px-5 py-2.5 text-center mt-[30px] "
        onClick={handleOpenModal}
      >
        Register new user
      </button>

      <Crud isOpen={isOpen} setIsOpen={setIsOpen} />
    </main>
  )
}

export default RegisterUser
