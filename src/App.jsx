// PAGES
import SignupPage from "./Authentication/SignupPage";
import LoginPage from "./Authentication/LoginPage";
import DashboardHome from "./DashBoard/DashboardHome";
import ForgotPassword from "./Authentication/ForgotPassword";
import ResetPassword from "./Authentication/ResetPassword";
// HOOKS IMPORT
import { useState, createContext } from "react";
import { Route,createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";

//Global state to hold the userdetails on Registration
export const UserContext = createContext();

function App() {
  // Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
          <Route index element={<SignupPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/dashboard" element={<DashboardHome />}/>
          <Route path="/forgotPassword" element={<ForgotPassword />}/>
          <Route path="/resetPassword" element={<ResetPassword />}/>
      </Route>
    )
  )
  // Current in App
  const[currentUser,setCurrentUser] = useState("")
  //State for User Details upon registration
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  // Preloader State
  const [loader, setLoader] = useState(false);


  return (
    <UserContext.Provider value={{ userDetails, setUserDetails,currentUser,setCurrentUser,loader,setLoader}}>
     <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
