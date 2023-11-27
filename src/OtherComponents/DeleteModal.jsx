import { createPortal } from "react-dom"
import { GiCancel } from "react-icons/gi";
const DeleteModal = ({skillDeleted,deleteModal,deleteSkill,keepSkill}) => {
  return createPortal(
    <section className="absolute top-0 w-full h-screen bg-black bg-opacity-50">
        <div className="bg-white text-black w-11/12 lg:w-6/12 mx-auto mt-60 p-10 rounded-md shadow-xl text-center ">
        <div  onClick={keepSkill} className="cursor-pointer text-red">
            <GiCancel />
          </div>
           <p className="mb-5"> Are you sure you want to delete this skill</p>
           <button onClick={()=>deleteSkill(skillDeleted)} className="ml-2 bg-green text-white px-7 py-2 rounded-md">Yes</button>
           <button onClick={keepSkill} className="ml-2 bg-red text-white px-7 py-2 rounded-md">No</button>
            </div>
    </section>,
    document.getElementById("modal-second")
  )
}

export default DeleteModal