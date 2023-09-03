import FormField from "../Authentication/FormField";
import TopHeader from "../Authentication/TopHeader";
import Button from "../Button";
import { useState, useEffect,useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { databases } from "../services/appwriteConfig";
import { promise } from "../services/appwriteConfig";
import { UserContext } from "../App";
import { Link,useNavigate } from "react-router-dom";
function NewTask() {
  const navigate = useNavigate()
  const {userId, setUserId,fileID,setFileID} = useContext(UserContext)
  const [title, setTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");


  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        let user = await promise.get();
        setUserId(user.$id)
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserAccount()
  }, []);
  // ONCLICK FUNCTION TO ADD TASKS TO DATABASE
  const addTasks = async () => {
    try {
      let promise = await databases.createDocument(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        uuidv4(),
        {
          title: title,
          taskDescription: taskDescription,
          priority: priority,
          dueDate: dueDate,
          status:"Not Started",
          uid:userId,
          
        }
      );
      navigate("/container/dashboard")
      setTitle("")
      setTaskDescription("")
      
    } catch (error) {
      console.log(error.message);
    }
  };

  const registerTaskTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleTaskDescription = (e) => {
    setTaskDescription(e.target.value);
  };

  const handleOptionChange1 = (e) => {
    setPriority(e.target.value);
  };
  const handleOptionChange2 = (e) => {
    setPriority(e.target.value);
  };
  const handleOptionChange3 = (e) => {
    setPriority(e.target.value);
  };
  const handleOptionChange4 = (e) => {
    setPriority(e.target.value);
  };

  const handleDateChange = (e) => {
    let selectedDate = e.target.value;

      // Create a new Date object from the selected date
      let date = new Date(selectedDate);

      // Get the month, date, and year
      let month = date.toLocaleString("default", { month: "long" });
      let day = date.getDate();
      let year = date.getFullYear();

      // Format the date
      let formattedDate = month + " " + day + ", " + year;

    setDueDate(formattedDate);
  };
  return (
    <section className="lg:w-8/12 pt-5 px-4">
       <TopHeader text="Add New a new Task" style="font-semibold text-3xl" />
      <div className="pt-8">
        <TopHeader text="Task Title" style="font-semibold" />
        <FormField register={registerTaskTitle} />
      </div>
      <div className="pt-8">
        <TopHeader text="Task Description" style="font-semibold" />
        <textarea
          className="border-2 outline-none rounded-md p-2"
          rows="5"
          cols="60"
          onChange={handleTaskDescription}
        ></textarea>
      </div>
      <TopHeader text="Set Priority" style="font-semibold" />
      <div className="flex justify-between w-6/12">
        <div>
          <FormField
            text="radio"
            message="Critical"
            name="option"
            value="Critical"
            register={handleOptionChange1}
          />
        </div>
        <div>
          <FormField
            text="radio"
            message="High"
            name="option"
            value="High"
            register={handleOptionChange2}
          />
        </div>
        <div>
          <FormField
            text="radio"
            message="Medium"
            name="option"
            value="Medium"
            register={handleOptionChange3}
          />
        </div>
        <div>
          <FormField
            text="radio"
            message="Low"
            name="option"
            value="low"
            register={handleOptionChange4}
          />
        </div>
      </div>
      <div className="pt-8">
        <TopHeader text="Due Date" style="font-semibold" />
        <FormField text="date" register={handleDateChange} style="appearance-none bg-white border border-gray-300 px-4 py-2 rounded-md text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-blue-500"/>
      </div>
      <Button
        btnFunc={addTasks}
        btnText="Add Task"
        style="px-11 mt-11 py-2 bg-purple-3 text-white rounded-md flex justify-center items-center hover:bg-purple-4"
      />
    
      
    </section>
  );
}

export default NewTask;
