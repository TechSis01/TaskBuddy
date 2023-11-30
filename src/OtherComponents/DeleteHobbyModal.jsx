import { createPortal } from "react-dom"
import { AiOutlineClose } from "react-icons/ai";
const DeleteHobbyModal = ({hobbyDeleted,deleteModal,deleteitem,keepHobby}) => {
  return createPortal(
    <section className="absolute top-0 w-full h-screen bg-black bg-opacity-50">
        <div className="bg-white text-black w-11/12 lg:w-6/12 mx-auto mt-60 p-10 rounded-md shadow-xl text-center ">
        <div  onClick={keepHobby} className="cursor-pointer text-red">
            {/* <AiOutlineClose /> */}
          </div>
           <p className="mb-5"> Are you sure you want to delete this hobby</p>
           <button onClick={()=>deleteitem(hobbyDeleted)} className="ml-2 bg-green text-white px-7 py-2 rounded-md">Yes</button>
           <button onClick={keepHobby} className="ml-2 bg-red text-white px-7 py-2 rounded-md">No</button>
            </div>
    </section>,
    document.getElementById("modal-second")
  )
}

export default DeleteHobbyModal