import React from "react";
import { promise } from "./services/appwriteConfig";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import TaskCalendar from "./OtherComponents/TaskCalendar";
import { useContext } from "react";
import { UserContext } from "./App";
import ProfilePic from "./OtherComponents/ProfilePic";
function CalendarSection() {
  const { events, setEvents, avatar, setAvatar, currentUser } =
    useContext(UserContext);
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      await promise.deleteSession("current");
      localStorage.removeItem("userSession");
      setEvents([]);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <section className="lg:w-4/12 border-gray-2 border-l-2 sticky top-0 h-screen px-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ProfilePic image={avatar} altText="profile picture" style="w-20"/>
          <p className="text-sm">{currentUser}</p>
        </div>

        <Button
          btnText="Logout"
          btnFunc={logOutHandler}
          style={` py-2 hover:bg-purple-400 bg-purple-3
              } text-white w-1/4 rounded-md flex justify-center items-center hover:bg-purple-4`}
        />
      </div>

      <TaskCalendar />
    </section>
  );
}

export default CalendarSection;
