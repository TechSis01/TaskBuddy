// PAGES
import SignupPage from "./Authentication/SignupPage";
import LoginPage from "./Authentication/LoginPage";
import DashboardHome from "./DashBoard/DashboardHome";
import ResetPassword from "./Authentication/ResetPassword";
import ForgotPasswordPage from "./Authentication/ForgotPasswordPage";
import Container from "./Container";
import Profile from "./Profile";
import Projects from "./Projects";
import NewTask from "./OtherComponents/NewTask";

// IMPORT IMAGE
import profilePic from "../src/Images/avatar.jfif"
// HOOKS IMPORT
import { useState, createContext, Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

//Global state to hold the userdetails on Registration
export const UserContext = createContext();

function App() {
  // Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<SignupPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="container" element={<Container />}>
          
            <Route path="dashboard" element={<DashboardHome/>} />
       
          <Route path="projects" element={<Projects />} />
          <Route path="profile" element={<Profile />} />
          <Route path="newTask" element={<NewTask />} />
        </Route>
        <Route path="forgotPassword" element={<ForgotPasswordPage />} />
        <Route path="resetPassword" element={<ResetPassword />} />
      </Route>
    )
  );
  // Current User in App
  const [currentUser, setCurrentUser] = useState("");
  // Current UserEmail in App
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  // Current UserPassword in App
  const [currentUserPassword, setCurrentUserPassword] = useState("");
  const [userId, setUserId] = useState("");
  // STATE FOR THE ALL THE USERS TASKS
  const [userTasks, setUserTasks] = useState([]);
  //Invalid User State
  const [isUserInvalid, setIsUserInvalid] = useState(false);
  //State for User Details upon registration
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Preloader State
  const [isLoading, setIsLoading] = useState(false)

  // Users events to be on Calendar
  const [events, setEvents] = useState([
    {
      title: "",
      start: "",
    },
  ]);

  const[avatar,setAvatar] = useState(profilePic)
  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        isLoading, setIsLoading,
        currentUserEmail,
        setCurrentUserEmail,
        currentUserPassword,
        setCurrentUserPassword,
        isUserInvalid,
        setIsUserInvalid,
        userId,
        setUserId,
        userTasks, setUserTasks,
        currentUser, setCurrentUser,
        events, setEvents,avatar,setAvatar
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
