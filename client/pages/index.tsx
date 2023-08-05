import Link from 'next/link'
import Modal from 'react-modal'

Modal.setAppElement('#__next')

const index = () => {
  return (
    <div className="ml-[30px] mt-[30px]">
      <Link
        href="/register"
        className="bg-blue-500 text-white px-5 py-3 rounded-md font-mono hover:opacity-75 transition-opacity duration-150"
      >
        Go to crud page
      </Link>
    </div>
  )
}

export default index
