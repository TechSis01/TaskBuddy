import FormField from "./FormField";
import Logo from "../Logo";
import logo from "../Images/brandName.png";
import { UserContext } from "../App";
import { useContext, useState, useEffect, useRef } from "react";
import { promise } from "../services/appwriteConfig";
import { Link } from "react-router-dom";
import TopHeader from "./TopHeader";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import Button from "../Button";

function SignUpForm() {
  // Use State from global variable
  const {
    userDetails,
    setUserDetails,
    currentUser,
    setCurrentUser,
    setLoader,
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
      console.log(userDetails.name);
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
    if (userDetails.password.length < 8) {
      setUserPasswordValidity(true);
    } else if (
      userDetails.password.length === 8 ||
      userDetails.password.length > 8
    ) {
      setUserPasswordValidity(false);
    }
  };
  const activateButton = () => {
    let emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    if (
      userDetails.name.length > 0 &&
      emailRegex.test(userDetails.email) &&
      userDetails.password.length > 7
    ) {
      setButtonClick(false);
    } else if (
      userDetails.name.length === 0 ||
      !emailRegex.test(userDetails.email) ||
      userDetails.password.length < 8
    ) {
      setButtonClick(true);
    }
  };

  useEffect(() => {
    activateButton();
  }, [userDetails.name, userDetails.email, userDetails.password]);

  // FUNCTION TO CREATE A NEW USER
  const signup = async () => {
    setLoader(true);
    try {
      const newUser = await promise.create(
        userDetails.password,
        userDetails.email,
        userDetails.password,
        userDetails.name
      );

      // Once the user clicks on create an account, account is created and a new session is created
      // for the user, then the verification to email is fired off
      verifyUser();
      setCurrentUser(userDetails.name);
      console.log(
        "verification email has been sent to your email check to verify"
      );
      if (userDetails.name.length > 0) {
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const verifyUser = async () => {
    try {
      // Authenticate the client by creating an email session
      await promise.createEmailSession(userDetails.email, userDetails.password);

      // Verification email sent
      let verify = await promise.createVerification(
        "http://localhost:5174/login"
      );
    } catch (error) {}
  };

  // Function to change password visibility
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
      <section className=" w-3/6 pt-12 ">
        <Logo style="w-60 ml-4" image={logo} altText="brandlogo" />
        <div className="ml-14">
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
              style="w-7/12 my-3"
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
              style="w-7/12 my-3"
              register={registerEmail}
            />
          </div>

          <div className="relative mt-2">
            {userPasswordValidity && (
              <p className="text-xs text-red italic inline absolute -top-4">
                password must be up to 8 characters
              </p>
            )}
            <div className="flex items-center justify-between w-7/12 border outline-none my-3 border-gray-1 px-2 rounded-md ring-0">
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
            <p className="text-red font-semibold">
              Please complete all required fields before proceeding
            </p>
          ) : (
            ""
          )}
          <Link to="/dashboard">
            <Button
              btnclick={buttonClick}
              btnFunc={signup}
              btnText="Create an Account"
              style={`pr-11 py-2 my-5 ${
                buttonClick
                  ? "bg-purple-400 hover:bg-purple-400"
                  : "bg-purple-3"
              } text-white w-7/12 rounded-md flex justify-center items-center hover:bg-purple-4`}
            ></Button>
          </Link>
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
