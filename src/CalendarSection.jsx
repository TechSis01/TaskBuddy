import React from "react";
import { promise } from "./services/appwriteConfig";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import TaskCalendar from "./OtherComponents/TaskCalendar";
import { useContext } from "react";
import { UserContext } from "./App";
import ProfilePic from "./OtherComponents/ProfilePic";
import profilePic from "../src/Images/avatar.jfif"
function CalendarSection() {
  const navigate = useNavigate();
  const { events, setEvents, avatar, setAvatar, currentUser,fileID,setFileID } =
    useContext(UserContext);
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
    <section className="lg:w-4/12 border-gray-2 border-l-2 sticky overflow-hidden top-0 h-screen px-5 py-4 lg:py-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center rounded-full hidden md:flex">
          <ProfilePic image={avatar} altText="profile picture" style="w-9 m-2 rounded-full"/>
          <p className="text-sm">{currentUser}</p>
        </div>
        <Button
          btnText="Logout"
          btnFunc={logOutHandler}
          style={`hidden md:block py-2 hover:bg-purple-400 bg-purple-3
              } text-white w-1/4 rounded-md flex justify-center items-center hover:bg-purple-4`}
        />
      </div>
      <TaskCalendar />
    </section>
  );
}

export default CalendarSection;
