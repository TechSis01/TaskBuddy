import { NavLink } from "react-router-dom";
import Logo2 from "../Images/Logo.png";
import { RxDashboard, RxAvatar } from "react-icons/rx";
import { AiOutlineProject } from "react-icons/ai";
import CalendarSection from "../CalendarSection";
import { useContext } from "react";
import { UserContext } from "../App";
import { AiOutlineClose } from "react-icons/ai";
function AsideBar() {
  const {isAsideBarOpen, setIsAsideBarOpen} = useContext(UserContext)
  const closeAside = ()=>{
    setIsAsideBarOpen(false)
  }
  return (
    <aside className={`${isAsideBarOpen ? "translate-x-2/4 transform transition-transform ease-in-out duration-300" : "translate-x-full transition-transform ease-in-out duration-300"} lg:-translate-x-0 xl:translate-x-0 fixed z-10 bg-purple-4 text-white lg:sticky top-0 h-screen lg:w-2/12`}>
      <button onClick={closeAside} className="lg:hidden"><AiOutlineClose className="ml-40 mt-5"/></button>
      <img src={Logo2} alt="second brand Logo" className="w-6/12 lg:w-auto"></img>
      <div className="flex flex-col">
        <NavLink to="dashboard" className="my-8 pl-8 py-4">
          <div className="flex items-center">
            <RxDashboard />
            <button className="pl-2">Dashboard</button>
          </div>
        </NavLink>

        <NavLink to="projects" className="my-8 pl-8 py-4">
          <div className="flex items-center">
            <AiOutlineProject />
            <button  className="pl-2">Projects</button>
          </div>
        </NavLink>

        <NavLink to="profile" className="my-8 pl-8 py-4">
          <div className="flex items-center">
            <RxAvatar />
            <button  className="pl-2">Profile</button>
          </div>
        </NavLink>
      </div>
    </aside>
  );
}

export default AsideBar;
