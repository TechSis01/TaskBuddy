// PAGES
import SignupPage from "./Authentication/SignupPage";
import LoginPage from "./Authentication/LoginPage";
import DashboardHome from "./DashBoard/DashboardHome";

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
          <Route path="login" element={<LoginPage />}/>
          <Route path="/dashboard" element={<DashboardHome />}/>
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
  // Preload State
  const [loader, setLoader] = useState(false);
  return (
    <UserContext.Provider value={{ userDetails, setUserDetails,currentUser,setCurrentUser,loader,setLoader}}>
     <RouterProvider router={router} />
    </UserContext.Provider>
  );
}

export default App;
