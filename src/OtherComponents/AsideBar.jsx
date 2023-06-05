import { NavLink } from "react-router-dom";
import Logo2 from "../Images/Logo.png";
import { RxDashboard, RxAvatar } from "react-icons/rx";
import { AiOutlineProject } from "react-icons/ai";
function AsideBar() {
  return (
    <aside className="bg-purple-4 text-white h-screen lg:w-2/12">
      <img src={Logo2} alt="second brand Logo"></img>
      <div className="flex flex-col">
        <NavLink to="/dashboard" className="my-8 pl-8 py-4">
          <div className="flex items-center">
            <RxDashboard />
            <button className="pl-2">Dashboard</button>
          </div>
        </NavLink>

        <NavLink to="/projects" className="my-8 pl-8 py-4">
          <div className="flex items-center">
            <AiOutlineProject />
            <button  className="pl-2">Projects</button>
          </div>
        </NavLink>

        <NavLink to="/profile" className="my-8 pl-8 py-4">
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
