import Carousel from "./Carousel";
import FormField from "./FormField";
import signUpImages from "./SignupImages";
import { Link } from "react-router-dom";
import TopHeader from "./TopHeader";
import { IoIosArrowBack } from "react-icons/io";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { promise } from "../services/appwriteConfig";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

const LoginPage = () => {
  //  State to change password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { userDetails, setUserDetails, setCurrentUser, setLoader } =
    useContext(UserContext);

  const registerEmailAdd = (e) => {
    setUserDetails({
      ...userDetails,
      email: e.target.value,
    });
  };

  const registerLoginPassword = (e) => {
    setUserDetails({
      ...userDetails,
      password: e.target.value,
    });
  };

  const showDeets = async () => {
    setLoader(true);
    try {
      let emailSession = await promise.createEmailSession(
        userDetails.email,
        userDetails.password
      );
      let user = await promise.get();
      setCurrentUser(user.name);
      if (user.name.length > 0) {
        setLoader(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to change password visibility
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");

    promise
      .updateVerification(userId, secret)
      .then(() => {
        console.log("User is verified");
        history.push("/login");
      })
      .catch((e) => {
        console.log("verification failed");
      });
  }, []);

  return (
    <section className="flex">
      <div className=" w-3/6 mt-24 ml-14 ">
        <TopHeader
          text="Welcome back to TaskBuddy"
          style="text-3xl font-semibold my-3"
          emoji={"\uD83D\uDC4B"}
        />
        <FormField
          text="email"
          textPlaceholder="Enter Email address"
          style="w-7/12"
          register={registerEmailAdd}
        />
        <div className="flex items-center justify-between w-7/12 border outline-none my-3 border-gray-1 px-2 rounded-md ring-0">
          <FormField
            text={passwordVisible ? "text" : "password"}
            textPlaceholder="Enter password"
            style="w-full flex-grow border-0 pr-28"
            register={registerLoginPassword}
          />
          <div onClick={showPassword} className="w-4">
            {passwordVisible ? <VscEye /> : <VscEyeClosed />}
          </div>
        </div>
        <Link
          to="/forgotPassword"
          className="text-purple-4 font-semibold hover:text-purple-6"
        >
          Forgot Password
        </Link>
        <div className="mt-8 w-7/12" onClick={showDeets}>
          <Link
            to="/dashboard"
            className="pr-11 py-2  bg-purple-3 text-white w-full rounded-md flex justify-center items-center hover:bg-purple-4"
          >
            Login
          </Link>
        </div>
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
