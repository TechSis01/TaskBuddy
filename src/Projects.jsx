import Box from "./OtherComponents/Box";
import { AiFillExclamationCircle } from "react-icons/ai";
import { BsStarFill } from "react-icons/bs";
import { BsFlagFill } from "react-icons/bs";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "./App";
import { useContext } from "react";
import { databases } from "./services/appwriteConfig";
import { Query } from "appwrite";
import { promise } from "./services/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { client } from "./services/appwriteConfig";
function Projects() {
  const navigate = useNavigate();
  const {
    criticalTasks,
    setCriticalTasks,
    highTasks,
    setHighTasks,
    mediumTasks,
    setMediumTasks,
    lowTasks,
    setLowTasks,
  } = useContext(UserContext);

  const fetchCriticalTasks = async () => {
    try {
      let user = await promise.get();
      let response = await databases.listDocuments(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        [Query.equal("uid", user.$id)]
      );
      let filteredTasks = response.documents.filter((task) => {
        return task.priority === "Critical";
      });
      setCriticalTasks(filteredTasks);
      const userCriticalTask = JSON.stringify(filteredTasks);
      // Store the JSON string in localStorage under a specific key
      localStorage.setItem('userCriticalTask', userCriticalTask)
      navigate("/container/critical");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchHighTasks = async () => {
    try {
      let user = await promise.get();
      let response = await databases.listDocuments(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        [Query.equal("uid", user.$id)]
      );
      let filteredTasks = response.documents.filter((task) => {
        return task.priority === "High";
      });
      setHighTasks(filteredTasks);
      navigate("/container/high");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMediumTasks = async () => {
    try {
      let user = await promise.get();
      let response = await databases.listDocuments(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        [Query.equal("uid", user.$id)]
      );
      let filteredTasks = response.documents.filter((task) => {
        return task.priority === "Medium";
      });
      setMediumTasks(filteredTasks);
      navigate("/container/medium");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchLowTasks = async () => {
    try {
      let user = await promise.get();
      let response = await databases.listDocuments(
        "647ca874cf8af94985ec",
        "6481e04550c724af79aa",
        [Query.equal("uid", user.$id)]
      );
      let filteredTasks = response.documents.filter((task) => {
        return task.priority === "low";
      });
      setLowTasks(filteredTasks);
      navigate("/container/low");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="lg:w-8/12 px-4">
      <div className="grid lg:grid-cols-2 gap-2 mt-32">
        {/* <Link to="/container/critical"> */}
        <div
          className="bg-red lg:h-56 flex justify-center items-center flex-col rounded-md hover:border-2 hover:border-orange-light hover:scale-y-105 shadow-xl"
          onClick={fetchCriticalTasks}
        >
          <AiFillExclamationCircle className="text-9xl text-white" />
          <p className="text-xl font-bold text-white"> Critical Tasks</p>
        </div>
        {/* </Link> */}

        {/* <Link to="/container/high"> */}
        <div
          className="bg-orange lg:h-56 flex justify-center items-center flex-col rounded-md hover:border-2 hover:border-orange-light hover:scale-y-105 shadow-xl"
          onClick={fetchHighTasks}
        >
          <BsStarFill className="text-9xl text-gold" />
          <p className="text-xl font-bold text-gold"> High Priority Tasks</p>
        </div>
        {/* </Link> */}

        {/* <Link to="/container/medium"> */}
        <div
          className="bg-mint lg:h-56 flex justify-center items-center flex-col rounded-md hover:border-2 hover:border-mint-dark hover:scale-y-105 shadow-xl"
          onClick={fetchMediumTasks}
        >
          <BsFlagFill className="text-9xl text-deep-blue" />
          <p className="text-xl font-bold text-deep-blue">
            Medium Priority Tasks
          </p>
        </div>
        {/* </Link> */}

        {/* <Link to="/container/low"> */}
        <div
          className="bg-yellow lg:h-56 flex justify-center items-center flex-col rounded-md hover:border-2 hover:border-dark-yellow hover:scale-y-105 shadow-xl"
          onClick={fetchLowTasks}
        >
          <BsFillArrowDownCircleFill className="text-9xl text-olive" />
          <p className="text-xl font-bold text-olive">Low Priority Tasks</p>
        </div>
        {/* </Link> */}
      </div>
    </section>
  );
}

export default Projects;
