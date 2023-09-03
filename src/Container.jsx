import {Outlet } from "react-router-dom";
import CalendarSection from "./CalendarSection";
import AsideBar from "./OtherComponents/AsideBar";
import Preloader from "./OtherComponents/Preloader";
import { useContext } from "react";
import { UserContext } from "./App";
function Container() {
  const {isLoading, setIsLoading} = useContext(UserContext)

    return (
      <section className="flex relative">
        <AsideBar />
        <Outlet />
        <CalendarSection />
      </section>
    );
}

export default Container;
