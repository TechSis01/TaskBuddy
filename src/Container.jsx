import { Outlet } from "react-router-dom";
import CalendarSection from "./CalendarSection";
import AsideBar from "./OtherComponents/AsideBar";
import Preloader from "./OtherComponents/Preloader";
import { useContext, useEffect } from "react";
import { UserContext } from "./App";
import {RxHamburgerMenu} from "react-icons/rx"
import { promise,databases } from "./services/appwriteConfig";
import { Query } from "appwrite";

function Container() {
  const {
    // isLoading,
    // setIsLoading,
    avatar,
    setAvatar,
    avatarID,
    setAvatarID,
    events,
    userTasks,
    setEvents,
    isAsideBarOpen, setIsAsideBarOpen,
  } = useContext(UserContext);

  const openAside = ()=>{
    setIsAsideBarOpen(true)
  }
  const fetchProfilePicture = async () => {
    try {
      let user = await promise.get();
      let res = await databases.listDocuments(
        "647ca874cf8af94985ec",
        "65058e1e9a1add9c9034",
        [Query.equal("uid", user.$id)]
      );
      if (res.total) {
        const profilePictureData = {
         picURL : res.documents[0].url,
         uniqueKey:res.documents[0].$id

        }
        const jsonString = JSON.stringify(profilePictureData)
        localStorage.setItem("userProfilePicture", jsonString)
        setAvatar(res.documents[0].url)
        setAvatarID(res.documents[0].$id)
        console.log(res.documents[0].url)
      }
    
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfilePicture()
    let items = localStorage.getItem("userTasks");
    if(items){
      const storedArray = JSON.parse(items);
      const newEvents = storedArray.map((doc) => ({
        start: doc.dueDate,
        end: doc.dueDate,
        title: doc.title,
        priority: doc.priority,
      }));
      setEvents(newEvents);
    }
    
    setIsAsideBarOpen(false)
  }, []);

  return (
    <section className="lg:flex relative text-xs md:text-base">
      <RxHamburgerMenu onClick={openAside} className="text-lg lg:hidden mt-5 ml-auto mr-5"/>
      <AsideBar />
      <Outlet />
      <CalendarSection />
    </section>
  );
}

export default Container;
