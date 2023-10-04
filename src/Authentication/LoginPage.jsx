import Carousel from "./Carousel";
import FormField from "./FormField";
import signUpImages from "./SignupImages";
import { Link,useNavigate } from "react-router-dom";
import TopHeader from "./TopHeader";
import { IoIosArrowBack } from "react-icons/io";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { promise } from "../services/appwriteConfig";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import Button from "../Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const LoginPage = () => {
  const navigate = useNavigate()
  // State to check email validity
  const [loginEmailValidity, setLoginEmailValidity] = useState(false);
  // State to check password validity
  const [loginPasswordValidity, setLoginPasswordValidity] = useState(false);

  // State to handle button Clickability
  const [buttonClick, setButtonClick] = useState(true);

  //  State to change password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    userDetails,
    setUserDetails,
    setIsUserInvalid,
    userId, setUserId,
    signUpLoader ,setSignUpLoader,fileID,setFileID,newUser,setNewUser, newUserSignUp, setNewUserSignUp,setNewUserSignUpPic
  } = useContext(UserContext);

  const notifyInvalidUser = () => toast("Invalid user,try again!")
  const registerEmailAdd = (e) => {
    setUserDetails({
      ...userDetails,
      email: e.target.value,
    });

    let emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    if (userDetails.email.length === 0 || !emailRegex.test(userDetails.email)) {
      setLoginEmailValidity(true);
    } else {
      setLoginEmailValidity(false);
    }
  };

  const registerLoginPassword = (e) => {
    setUserDetails({
      ...userDetails,
      password: e.target.value,
    });
    if (userDetails.password.length < 8) {
      setLoginPasswordValidity(true);
    } else if (userDetails.password.length > 7) {
      setLoginPasswordValidity(false);
    }
  };

  const loginHandler = async () => {

    try {
      let emailSession = await promise.createEmailSession(
        userDetails.email,
        userDetails.password
      );
      localStorage.setItem("userSession",emailSession.userId)
       navigate("/container/dashboard")
      
       setNewUserSignUpPic(false)
       setNewUserSignUp(false)
    } 
    catch (error) {
      if(error.code === 401){
        setIsUserInvalid(true)
        notifyInvalidUser()
      }
      else{
        return error;
      }
      console.log(error.message)
    }
  };

  const activateButton = () => {
    
    let emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    if (emailRegex.test(userDetails.email) && userDetails.password.length > 7) {
      setButtonClick(false)
    }
     else if ( !emailRegex.test(userDetails.email) || userDetails.password.length < 8 ) {
      setButtonClick(true);
    }
  };

  useEffect(() => {
    // LOCALSTORAGE WILL BE CLEARED, AND REMOVE THE USERSESSION THERE, SO THAT WE ARE NOT STUCK ON THE SAME STATE
    localStorage.clear()
    activateButton();
    
  }, [userDetails.email, userDetails.password]);

  // Function to change password visibility
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className="flex">
      <ToastContainer />
      <div className=" w-3/6 mt-40 ml-14 ">
        <TopHeader
          text="Welcome back to TaskBuddy"
          style="text-3xl font-semibold my-3 text-purple-4"
          emoji={"\uD83D\uDC4B"}
        />
        <div className="relative mt-2">
          {loginEmailValidity && (
            <span className="text-xs text-red italic inline absolute -top-1">
              invalid email
            </span>
          )}
          <FormField
            text="email"
            textPlaceholder="Enter Email address"
            style="w-7/12 my-3"
            register={registerEmailAdd}
          />
        </div>

        <div className="relative mt-2">
          {loginPasswordValidity && (
            <p className="text-xs text-red italic inline absolute -top-4">
              password must be up to 8 characters
            </p>
          )}
          <div className="flex items-center justify-between w-7/12 border outline-none my-3 border-gray-1 px-2 rounded-md ring-0">
            <FormField
              text={passwordVisible ? "text" : "password"}
              textPlaceholder="Enter password"
              style="w-full flex-grow border-0 pr-28 "
              register={registerLoginPassword}
            />
            <div onClick={showPassword} className="w-4">
              {passwordVisible ? <VscEye /> : <VscEyeClosed />}
            </div>
          </div>
        </div>

        <Link
          to="/forgotPassword"
          className="text-purple-4 font-semibold hover:text-purple-6"
        >
          Forgot Password
        </Link>

        <Button
            btnclick={buttonClick}
            btnFunc={loginHandler}
            btnText="Login"
            style={`pr-11 py-2 my-5 ${
              buttonClick ? "bg-purple-400 hover:bg-purple-400" : "bg-purple-3"
            } text-white w-7/12 rounded-md flex justify-center items-center hover:bg-purple-4`}
          ></Button>
        {/* <Link to="/container/dashboard">
        
        </Link> */}
        <div className="mt-8 flex items-center text-purple-4 font-semibold hover:text-purple-5">
          <IoIosArrowBack />
          <Link to="/">Create an Account</Link>
        </div>
      </div>
      <Carousel carouselImages={signUpImages} />
    </section>
  );
};

export default LoginPage;
