import { createContext, useState } from 'react'

// Define the type for the context state
type ModalContextState = {
  isOpen: boolean
  isEditModal: boolean
  editId: string | number
}

// Define the type for the context methods
type ModalContextMethods = {
  handleOpenModal: () => void
  handleCloseModal: () => void
  getUserId: () => void
  handleOpenEditModal: () => void
  handleCloseEditModal: () => void
}

// Create the context
const MyContext = createContext<
  (ModalContextState & ModalContextMethods) | null | any
>(null)

// Create the provider component
const MyProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isEditModal, setIsEditModal] = useState<boolean>(false)

  const [editId, setEditId] = useState<string | number>('')

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleOpenEditModal = () => {
    setIsEditModal(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModal(false)
  }

  const getUserId = (id: string | number) => {
    handleOpenEditModal()
    setEditId(id)
  }

  const values = {
    isOpen,
    setIsOpen,
    handleOpenModal,
    handleCloseModal,
    handleOpenEditModal,
    handleCloseEditModal,
    getUserId,
    editId,
    isEditModal,
    setIsEditModal,
  }

  return <MyContext.Provider value={values}>{children}</MyContext.Provider>
}

export { MyContext, MyProvider }
