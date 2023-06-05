import {Outlet } from "react-router-dom";
import CalendarSection from "./CalendarSection";
import AsideBar from "./OtherComponents/AsideBar";

function Container() {
  return (
    <section className="flex">
      <AsideBar />
      <Outlet />
      <CalendarSection />
    </section>
  );
}

export default Container;
