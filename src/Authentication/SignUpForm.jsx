import FormField from "./FormField";
import Logo from "../Logo";
import logo from "../Images/brandName.png";
import { UserContext } from "../App";
import { useContext, useState, useEffect, useRef } from "react";
import { promise } from "../services/appwriteConfig";
import { Link, useNavigate } from "react-router-dom";
import TopHeader from "./TopHeader";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import Button from "../Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { v4 as uuidv4 } from "uuid";
import { BsTruckFlatbed } from "react-icons/bs";
import loadButton from "../Images/btnLoad.gif"
function SignUpForm() {
  const navigate = useNavigate();
  // Use State from global variable
  const {
    userDetails,
    setUserDetails,
    setNewUser,
  } = useContext(UserContext);

  // State to handle button Clickability
  const [buttonClick, setButtonClick] = useState(true);

  //  State to change password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // State to check username validity
  const [userNameValidity, setUserNameValidity] = useState(false);
  // State to check email validity
  const [userEmailValidity, setUserEmailValidity] = useState(false);
  // State to check password validity
  const [userPasswordValidity, setUserPasswordValidity] = useState(false);
  const [signUpText ,setSignUpText] = useState(false)
  const notify = () => {
    toast("An email verification has been sent to you.", {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  // Register UserName
  const registerUserName = (e) => {
    setUserDetails({
      ...userDetails,
      name: e.target.value,
    });

    if (e.target.value.length === 0) {
      setUserNameValidity(true);
    } else if (e.target.value.length > 0) {
      setUserNameValidity(false);
    }
  };

  // Register Email
  const registerEmail = (e) => {
    setUserDetails({
      ...userDetails,
      email: e.target.value,
    });

    let emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    if (userDetails.email.length === 0 || !emailRegex.test(userDetails.email)) {
      setUserEmailValidity(true);
    } else {
      setUserEmailValidity(false);
    }
  };
  // Create password for user
  const registerPassword = (e) => {
    setUserDetails({
      ...userDetails,
      password: e.target.value,
    });
    if (userDetails.password.length <= 6) {
      setUserPasswordValidity(true);
    } else if (
      
      userDetails.password.length > 6
    ) {
      setUserPasswordValidity(false);
    }
  };
  const activateButton = () => {
    let emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    if (
      userDetails.name.length > 0 &&
      userDetails.password.length >= 8
    ) {
      setButtonClick(false);
    } else if (
      userDetails.name.length === 0 ||
      !emailRegex.test(userDetails.email) ||
      userDetails.password.length <= 7
    ) {
      setButtonClick(true);
    }
  };

  useEffect(() => {
    // LOCALSTORAGE WILL BE CLEARED, AND REMOVE THE USERSESSION THERE, SO THAT WE ARE NOT STUCK ON THE SAME STATE
    localStorage.clear();
    setNewUser(true);
    activateButton();
  }, [userDetails.name, userDetails.email, userDetails.password]);

  // FUNCTION TO CREATE A NEW USER
  const signup = async () => {
    setSignUpText(true)
    try {
      const newUser = await promise.create(
        uuidv4(),
        userDetails.email,
        userDetails.password,
        userDetails.name
      );
      // Once the user clicks on create an account, account is created and a new session is created
      // for the user, then the verification to email is fired off
      
      await verifyUser();
      setTimeout(()=>{
        navigate("/container/dashboard")
      },1000)
    } catch (error) {
      setSignUpText(false)
      console.log(error)
    }
  };

  const verifyUser = async () => {
    try {
      // Authenticate the client by creating an email session
      let userSession = await promise.createEmailSession(
        userDetails.email,
        userDetails.password
      );
      localStorage.setItem("userSession", userSession.userId);

      await promise.createVerification("https://taskbuddy-mu.vercel.app/login");
      notify();
    } catch (error) {
      console.log(error);
    }
  };

  // Function to change password visibility
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className=" md:w-3/6 pt-12 text-xs md:text-base ">
      <ToastContainer />
      <Logo style="w-60 md:ml-4" image={logo} altText="brandlogo" />
      <div className="mx-auto w-4/5 md:w-auto md:ml-14">
        <TopHeader
          style="text-gray-400"
          text="Hello there, let's set your goals together"
          emoji={"\uD83D\uDC4B"}
        />
        <div className="relative mt-2">
          {userNameValidity && (
            <span className="text-xs text-red italic inline absolute -top-1">
              invalid name
            </span>
          )}
          <FormField
            text="text"
            textPlaceholder="Username"
            style="w-4/5 md:w-7/12 my-3"
            register={registerUserName}
          />
        </div>
        <div className="relative mt-2">
          {userEmailValidity && (
            <span className="text-xs text-red italic inline absolute -top-1">
              invalid email
            </span>
          )}
          <FormField
            text="email"
            textPlaceholder="Enter your email"
            style="w-4/5 md:w-7/12 my-3"
            register={registerEmail}
          />
        </div>

        <div className="relative mt-2">
          {userPasswordValidity && (
            <p className="text-xs text-red italic inline absolute -top-4">
              password must be up to 8 characters
            </p>
          )}
          <div className="flex items-center justify-between w-4/5 md:w-7/12 border outline-none my-3 border-gray-1 px-2 rounded-md ring-0">
            <FormField
              text={passwordVisible ? "text" : "password"}
              textPlaceholder="Enter password"
              style="w-full flex-grow border-0 pr-28"
              register={registerPassword}
            />

            <div onClick={showPassword} className="w-4">
              {passwordVisible ? <VscEye /> : <VscEyeClosed />}
            </div>
          </div>
        </div>

        {buttonClick ? (
          <p className="text-red">
            Please complete all required fields before proceeding
          </p>
        ) : (
          ""
        )}
        <Button
          btnclick={buttonClick}
          btnFunc={signup}
          btnText="Create an Account"
          enableSpiner={signUpText}
          style={`md:pr-11 py-2 my-5 ${
            buttonClick ? "bg-purple-400 hover:bg-purple-400" : "bg-purple-3"
          } text-white w-7/12 rounded-md flex justify-center items-center hover:bg-purple-4`}
        ></Button>
        <p>
          Already have an account?{" "}
          <span>
            <Link
              to="/login"
              className="text-purple-4 font-semibold hover:text-purple-6"
            >
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </section>
  );
}

export default SignUpForm;
