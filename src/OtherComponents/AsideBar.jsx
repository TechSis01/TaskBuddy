import { NavLink } from "react-router-dom";
import Logo2 from "../Images/Logo.png";
import { RxDashboard, RxAvatar } from "react-icons/rx";
import { AiOutlineProject } from "react-icons/ai";
import CalendarSection from "../CalendarSection";
import { useContext } from "react";
import { UserContext } from "../App";
import { AiOutlineClose } from "react-icons/ai";
import ProfilePic from "./ProfilePic";
import Button from "../Button";
import profilePic from "../Images/avatar.jfif"
import { useNavigate } from "react-router-dom";
import { promise } from "../services/appwriteConfig";
function AsideBar() {
  const navigate = useNavigate();
  const {isAsideBarOpen, setIsAsideBarOpen,events, setEvents, avatar, setAvatar, currentUser,fileID,setFileID} = useContext(UserContext)
  const closeAside = ()=>{
    setIsAsideBarOpen(false)
  }

  const logOutHandler = async () => {
    try {
      await promise.deleteSession("current");
      localStorage.clear();
      setEvents([]);
      setFileID("")
      setAvatar(profilePic)
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <aside className={`${isAsideBarOpen ? "translate-x-2/4 transform transition-transform ease-in-out duration-300" : "translate-x-full transition-transform ease-in-out duration-300"} lg:-translate-x-0 xl:translate-x-0 z-10 fixed bg-purple-4 md:sticky text-white top-0 h-screen lg:w-2/12`}>
      <button onClick={closeAside} className="lg:hidden"><AiOutlineClose className="ml-40 mt-5"/></button>
      <div className="flex w-6/12 justify-between px-2 items-center rounded-full md:hidden">
          <ProfilePic image={avatar} altText="profile picture" style="w-9 m-2 rounded-full"/>
          <p className="text-xm">{currentUser}</p>
        </div>

        
      <img src={Logo2} alt="second brand Logo" className="w-6/12 lg:w-auto"></img>
    
      <div className="flex flex-col">
        <NavLink to="dashboard" className="pl-8 py-2">
          <div className="flex items-center">
            <RxDashboard />
            <button className="pl-2">Dashboard</button>
          </div>
        </NavLink>

        <NavLink to="projects" className="pl-8 py-4">
          <div className="flex items-center">
            <AiOutlineProject />
            <button  className="pl-2">Projects</button>
          </div>
        </NavLink>

        <NavLink to="profile" className="pl-8 py-4">
          <div className="flex items-center">
            <RxAvatar />
            <button  className="pl-2">Profile</button>
          </div>
        </NavLink>

      </div>
      <Button
          btnText="Logout"
          btnFunc={logOutHandler}
          style={` md:hidden py-2 bg-red
              } text-white w-1/4 rounded-md flex justify-center items-center ml-5`}
        />
    </aside>
  );
}

export default AsideBar;
