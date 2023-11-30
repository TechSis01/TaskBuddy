import { momentLocalizer, Calendar } from "react-big-calendar";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

const localizer = momentLocalizer(moment);

function TaskCalendar(props) {
  const { events, setEvents } = useContext(UserContext);
  const [eventColor, setEventColor] = useState("")
  useEffect(()=>{
    events.map((event)=>{
    
      setEventColor(event.color)
    })
  },[])
  
 
  return (
    <div className="h-4/5 text-sm">
      <Calendar
        localizer={localizer}
        events={events}
        defaultView={"month"}
        views={["month"]}
        eventPropGetter={(event=>{
          return{
            style:{
              
              backgroundColor:event.color
            }
          }
        })}
      />
    </div>
  );
}
export default TaskCalendar;

