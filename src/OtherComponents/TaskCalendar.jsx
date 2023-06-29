import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from '@fullcalendar/daygrid'
import { useContext,useState } from "react";
import { UserContext } from "../App";
function TaskCalendar() {
  const [showTooltip, setShowTooltip] = useState(false);
  const{events, setEvents} = useContext(UserContext)
 const[currentEvent,setCurrentEvent] = useState("")
 

  const handleEventMouseEnter = (info) => {
    const event = info.event;
    let fullInfo = event._def.title
    setShowTooltip(true);
    setCurrentEvent(fullInfo)
   
  };

  const handleEventMouseLeave = (info)=>{
    setShowTooltip(false)
  }

 
  return (
    <div className="text-xs rounded-md cursor-pointer">
      <FullCalendar 
       headerToolbar={{start: 'title', // will normally be on the left. if RTL, will be on the right
       center: '',
       end: 'prev,next'}} // will normally be on the right. if RTL, will be on the left
        plugins={[dayGridPlugin]}
        initialView={"dayGridMonth"}
        height={"80vh"}
        aspectRatio={20}
        events={events}
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        eventClassNames={["bg-mint"]}
      />
       {showTooltip && <div className="absolute top-44 left-16 bg-red text-white p-2 rounded-md font-bold z-10">{currentEvent}</div>}
    </div>
  )
}

export default TaskCalendar