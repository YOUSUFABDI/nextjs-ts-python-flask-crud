import { createContext, useState } from 'react'

// Define the type for the context state
type ModalContextState = {
  isOpen: boolean
}

// Define the type for the context methods
type ModalContextMethods = {
  handleOpenModal: () => void
}

// Create the context
const MyContext = createContext<
  (ModalContextState & ModalContextMethods) | null | any
>(null)

// Create the provider component
const MyProvider = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  return (
    <MyContext.Provider
      value={{
        isOpen,
        setIsOpen,
        handleOpenModal,
      }}
    >
      {children}
    </MyContext.Provider>
  )
}

export { MyContext, MyProvider }
