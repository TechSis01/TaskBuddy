import { Outlet } from "react-router-dom";
import CalendarSection from "./CalendarSection";
import AsideBar from "./OtherComponents/AsideBar";
import Preloader from "./OtherComponents/Preloader";
import { useContext, useEffect } from "react";
import { UserContext } from "./App";
function Container() {
  const {
    isLoading,
    setIsLoading,
    events,
    userTasks,
    setEvents,
  } = useContext(UserContext);

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
      console.log(newEvents);
    }
   
  }, []);

  return (
    <section className="flex relative">
      <AsideBar />
      <Outlet />
      <CalendarSection />
    </section>
  );
}

export default Container;
