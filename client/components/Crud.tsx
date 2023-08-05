import DisplayUsers from './DisplayUsers'
import RegisterModal from './RegisterModal'
import UpdateModal from './UpdateModal'

const Crud = () => {
  return (
    <section>
      <DisplayUsers />
      <UpdateModal />
      <RegisterModal />
    </section>
  )
}

export default Crud
