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
import Critical from "./TaskCategory/Critical";
import High from "./TaskCategory/High";
import Medium from "./TaskCategory/Medium";
import Low from "./TaskCategory/Low";

// IMPORT IMAGE
import profilePic from "../src/Images/avatar.jfif";
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
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="projects" element={<Projects />} />
          <Route path="critical" element={<Critical />} />
          <Route path="high" element={<High />} />
          <Route path="medium" element={<Medium />} />
          <Route path="low" element={<Low />} />
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
  const [isLoading, setIsLoading] = useState(false);

  // Users events to be on Calendar
  const [events, setEvents] = useState([
    {
      title: "",
      start: "",
    },
  ]);
  // PROFILE PIC STATE
  const [avatar, setAvatar] = useState(profilePic);

  // File ID State
  const [fileID, setFileID] = useState("");

  // PROFILE DOCUMENT STATE
  const [profile, setProfile] = useState({});

  // DOCUMENT ID

  const [documentID, setDocumentID] = useState("");

  // NEW USER
  const [newUser, setNewUser] = useState(true);

  const [criticalTasks, setCriticalTasks] = useState([]);
  const [highTasks, setHighTasks] = useState([]);
  const [mediumTasks, setMediumTasks] = useState([]);
  const [lowTasks, setLowTasks] = useState([]);
  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        isLoading,
        setIsLoading,
        currentUserEmail,
        setCurrentUserEmail,
        currentUserPassword,
        setCurrentUserPassword,
        isUserInvalid,
        setIsUserInvalid,
        userId,
        setUserId,
        userTasks,
        setUserTasks,
        currentUser,
        setCurrentUser,
        events,
        setEvents,
        avatar,
        setAvatar,
        fileID,
        setFileID,
        newUser,
        setNewUser,
        profile,
        setProfile,
        documentID,
        setDocumentID,
        criticalTasks,
        setCriticalTasks,
        highTasks,
        setHighTasks,
        mediumTasks,
        setMediumTasks,
        lowTasks,
        setLowTasks,
      }}
    >
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
