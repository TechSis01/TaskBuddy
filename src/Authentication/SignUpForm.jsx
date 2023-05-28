import FormField from "./FormField";
import Button from "../Button";
import Logo from "../Images/brandName.png";
import { UserContext } from "../App";
import { useContext, useState } from "react";
import { promise } from "../services/appwriteConfig";
import { Link } from "react-router-dom";
import TopHeader from "./TopHeader";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
function SignUpForm() {
  // Use State from global variable
  const {
    userDetails,
    setUserDetails,
    currentUser,
    setCurrentUser,
    setLoader,
  } = useContext(UserContext);
  //  State to change password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  //Register UserName
  const registerUserName = (e) => {
    setUserDetails({
      ...userDetails,
      name: e.target.value,
    });
  };
  // Register Email
  const registerEmail = (e) => {
    setUserDetails({
      ...userDetails,
      email: e.target.value,
    });
  };
  // Create password for user
  const registerPassword = (e) => {
    setUserDetails({
      ...userDetails,
      password: e.target.value,
    });
  };

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
      let verify = await promise.createVerification("https://taskbuddy-mu.vercel.app/dashboard");
    } catch (error) {}
  };

  // Function to change password visibility
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <section className=" w-3/6 mt-12 ">
      <img src={Logo} alt="TaskBuddy" className="w-60 ml-4"></img>
      <div className="ml-14">
        <TopHeader
          style="text-gray-400"
          text="Hello there, let's set your goals together"
          emoji={"\uD83D\uDC4B"}
        />
        <FormField
          text="text"
          textPlaceholder="Username"
          style="w-7/12 my-3"
          register={registerUserName}
        />
        <FormField
          text="email"
          textPlaceholder="Enter your email"
          style="w-7/12 my-3"
          register={registerEmail}
        />
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
        <div className="flex items-center justify-between w-7/12">
          <FormField text="checkbox" message="Remember me" />
          <p>Forgot Password</p>
        </div>
        <div className="my-8 w-7/12" onClick={signup}>
          <Link
            to="/dashboard"
            className="pr-11 py-2  bg-purple-3 text-white w-full rounded-md flex justify-center items-center hover:bg-purple-4"
          >
            Create an Account
          </Link>
        </div>
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
