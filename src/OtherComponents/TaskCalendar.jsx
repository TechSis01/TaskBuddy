import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";

const localizer = momentLocalizer(moment);

function TaskCalendar(props) {
  const { events, setEvents } = useContext(UserContext);

  return (
    <div className="h-4/5 text-sm">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={"month"}
        views={["month"]}
      />
    </div>
  );
}
export default TaskCalendar;

