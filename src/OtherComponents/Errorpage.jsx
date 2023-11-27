import Error from "../Images/Errorpage.png"
import { Link } from "react-router-dom"
import { IoArrowUndo } from "react-icons/io5";
function Errorpage() {
  return (
    <div>
        <div className="flex justify-center items-center w-6/12 mx-auto text-center text-xl text-purple-800 font-bold py-5">
        <IoArrowUndo /><Link to="dashboard" >Back to dashboard</Link>
        </div>
       <img src={Error} alt="PAGE NOT FOUND!" className="w-6/12 mx-auto"></img>
    </div>
  )
}

export default Errorpage