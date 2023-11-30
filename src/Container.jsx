import { Outlet } from "react-router-dom";
import CalendarSection from "./CalendarSection";
import AsideBar from "./OtherComponents/AsideBar";
import Preloader from "./OtherComponents/Preloader";
import { useContext, useEffect } from "react";
import { UserContext } from "./App";
import {RxHamburgerMenu} from "react-icons/rx"
function Container() {
  const {
    // isLoading,
    // setIsLoading,
    events,
    userTasks,
    setEvents,
    isAsideBarOpen, setIsAsideBarOpen,
  } = useContext(UserContext);

  const openAside = ()=>{
    setIsAsideBarOpen(true)
  }


  useEffect(() => {
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
