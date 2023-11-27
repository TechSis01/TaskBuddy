import FormField from "../Authentication/FormField";
import TopHeader from "../Authentication/TopHeader";
import Button from "../Button";
import { useState, useEffect,useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import { databases } from "../services/appwriteConfig";
import { promise } from "../services/appwriteConfig";
import { UserContext } from "../App";
import { Link,useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from "react-datepicker"
import moment from "moment";
import {RxHamburgerMenu} from "react-icons/rx"
function NewTask() {
  const navigate = useNavigate()
  const {userId, setUserId,fileID,setFileID,isAsideBarOpen, setIsAsideBarOpen,} = useContext(UserContext)
  const [title, setTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState(new Date())


  useEffect(() => {
    console.log(dueDate)
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
          // start:moment(dueDate.slice(0, -5)).toDate()
          
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
    console.log(e.target.value)
  };
  const handleOptionChange2 = (e) => {
    setPriority(e.target.value);
    console.log(e.target.value)
  };
  const handleOptionChange3 = (e) => {
    setPriority(e.target.value);
    console.log(e.target.value)
  };
  const handleOptionChange4 = (e) => {
    setPriority(e.target.value);
    console.log(e.target.value)
  };
  const weekend = (date) => new Date () < date

  const openAside = ()=>{
    setIsAsideBarOpen(!isAsideBarOpen)
  }
  return (
    <section className="lg:w-8/12 pt-5 px-4">
      <div className="flex justify-between p-5">
        <div></div>
        <RxHamburgerMenu onClick={openAside}  />
      </div>
       <TopHeader text="Add New a new Task" style="font-semibold text-3xl" />
      <div className="pt-8">
        <TopHeader text="Task Title" style="font-semibold" />
        <FormField register={registerTaskTitle} textPlaceholder="Task Title" />
      </div>
      <div className="pt-8">
        <TopHeader text="Task Description" style="font-semibold" />
        <textarea
          className="border-2 outline-none rounded-md p-2 w-4/5 lg:w-auto"
          rows="5"
          cols="60"
          onChange={handleTaskDescription}
          placeholder="Describe your task in detail"
        ></textarea>
      </div>
      <TopHeader text="Set Priority" style="font-semibold" />
      <div className="flex justify-between w-4/5 lg:w-6/12">
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
        <DatePicker className="border-2 outline-none rounded-md p-2 cursor-pointer" selected={dueDate} onChange={(date) => setDueDate(date)} filterDate={weekend}/>

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
