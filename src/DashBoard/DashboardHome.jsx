import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { promise } from "../services/appwriteConfig";
import { Link, useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import Preloader from "../OtherComponents/Preloader";
import FormField from "../Authentication/FormField";
import { RxMagnifyingGlass } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";
import { CiTimer } from "react-icons/ci";
import { BiAddToQueue } from "react-icons/bi";
import { FaTasks } from "react-icons/fa";
import Button from "../Button";
import { databases } from "../services/appwriteConfig";
import { Query } from "appwrite";
import Box from "../OtherComponents/Box";
import { format } from "date-fns";
function DashboardHome() {
  const {
    userTasks,
    setUserTasks,
    currentUser,
    setCurrentUser,
    isLoading,
    setIsLoading,
    events, setEvents,
    currentUserEmail,
    setCurrentUserEmail,
  } = useContext(UserContext);

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [taskInProgress, setInProgressTasks] = useState(0);
  const [notStartedTasks, setNotStartedTasks] = useState(0);
 
  
  
  const fetchDocs = async () => {
    try {
      let user = await promise.get();
      let res = await databases.listDocuments(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        [Query.equal("uid", user.$id)]
      );
      setCurrentUser(user.name);
      setCurrentUserEmail(user.email)
      setUserTasks(res.documents);
      setIsLoading(false);
      setTotalTasks(res.total);
   
  
      let notStarted = res.documents.filter((task) => {
        return task.status === "Not Started";
      });
      setNotStartedTasks(notStarted.length);
      let complete = res.documents.filter((task) => {
        return task.status === "Completed";
      });
      setCompletedTasks(complete.length);

      let started = res.documents.filter((task) => {
        return task.status === "Started";
      });
      setInProgressTasks(started.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(()=>{
    const newEvents = userTasks.map((doc) => ({
      title: doc.title,
      priority:doc.priority,
      start: format(new Date(doc.dueDate), 'yyyy-MM-dd')
    }));
    console.log(newEvents)
    setEvents((prevEvents) => {
      // Filter out existing events to avoid duplicates
      const filteredEvents = newEvents.filter((newEvent) => {
        return !prevEvents.some((prevEvent) => {
          return (
            prevEvent.title === newEvent.title && prevEvent.start === newEvent.start
          );
        });
      });
  
      // Combine existing events with new, filtered events
      return [newEvents,...filteredEvents];
    });
  },[userTasks])

  useEffect(() => {
    isLoading && fetchDocs();
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (isLoading) {
    return (
      <section className="lg:w-8/12">
        <Preloader />
      </section>
    );
  }

  let currentDate = new Date();
  let year = currentDate.getFullYear(); // Get the current year
  let month = currentDate.toLocaleString("default", { month: "long" }); // Get the current month (0-11; 0 represents January)
  let day = currentDate.getDate();

 
  return (
    
    <section className="lg:w-8/12 ">
  
      <section className="pt-2 px-4">
        <div className="py-4">
          <h1 className="text-xl font-semibold "> Hello {currentUser} !</h1>
          <p className="italic">What do you want to do today?</p>
          <p className="text-gray-3 text-xs">
            {month} {day}, {year}
          </p>
          {/* <FormField
            text="text"
            textPlaceholder="search tasks"
            style="w-full"
          /> */}
        </div>

        <div className="flex justify-between">
          <Box
            text="All Tasks"
            number={totalTasks}
            icon={<FaTasks />}
            style="bg-purple-9 p-12 bg-opacity-30 rounded-md border-2 border-purple-5"
            iconStyle="text-purple-8 bg-purple-5 p-2 rounded-full w-6/12"
            numberStyle="text-3xl font-bold"
          />
          <Box
            text="Completed"
            number={completedTasks}
            icon={<BsCheckLg />}
            style="bg-purple-9 p-12 bg-opacity-30 rounded-md"
            iconStyle="text-green-400 bg-mint p-2 rounded-full w-6/12"
            numberStyle="text-3xl font-bold "
          />
          <Box
            text="In Progress"
            number={taskInProgress}
            icon={<CiTimer />}
            style="bg-purple-9 p-12 bg-opacity-30 rounded-md"
            iconStyle="text-purple-5 font-bold bg-purple-9 p-2 rounded-full w-6/12"
            numberStyle="text-3xl font-bold "
          />
          <Box
            text="Not Started"
            number={notStartedTasks}
            icon={<BiAddToQueue />}
            style="bg-purple-9 p-12 bg-opacity-30 rounded-md"
            iconStyle="text-yellow-2 bg-yellow bg-opacity-30 p-2 rounded-full w-6/12"
            numberStyle="text-3xl font-bold "
          />
        </div>

        <h1 className="py-4 font-semibold">All Tasks</h1>
        <Link to="/container/newTask">
          <Button
            btnText="Add new Task"
            style="pr-11 py-2 text-white w-full rounded-md flex justify-center items-center bg-purple-4"
          />
        </Link>

        <section className="py-8">
          <div className="grid grid-cols-4 font-semibold py-4">
            <div>Tasks</div>
            <div>Priority</div>
            <div>Due Date</div>
            <div>Status</div>
          </div>
          <hr></hr>
          {userTasks.map((task) => (
            <div
              key={task.$id}
              className="grid grid-cols-4 hover:bg-purple-100 rounded-md "
            >
              <div className="py-4 ">{task.title}</div>
              <div className="py-4">
                <p
                  className={`w-4/12 text-center rounded-md ${
                    task.priority === "Critical" ? "bg-red text-white" : ""
                  } ${task.priority === "low" ? "bg-yellow text-white" : ""} ${
                    task.priority === "High" ? "bg-orange text-white" : ""
                  } ${task.priority === "Medium" ? "bg-mint text-white" : ""}`}
                >
                  {task.priority}
                </p>
              </div>

              <div className="py-4 ">{task.dueDate}</div>
              <div className="py-4 ">{task.status}</div>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
}

export default DashboardHome;
