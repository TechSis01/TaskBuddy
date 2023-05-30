import FormField from "./FormField";
import Carousel from "./Carousel";
import signUpImages from "./SignupImages";
import Button from "../Button";
import TopHeader from "./TopHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { promise } from "../services/appwriteConfig";
import { useState } from "react";
import Logo from "../Logo";
import logo from "../Images/brandName.png";
function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");

  const notify = async (e) => {
    registerEmail(e);
    console.log(userEmail);
    toast("A password reset email has been sent to your account.", {
      position: "top-left",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    try {
      await promise.createRecovery(
        userEmail,
        "http://localhost:5173/resetPassword"
      );
    } catch (e) {
      console.log("error");
    }
  };

  // Email for password recovery
  const registerEmail = (e) => {
    setUserEmail(e.target.value);
  };

  return (
      <section>
      <Logo style="w-60 ml-4" image={logo} altText="brandlogo" />
        <ToastContainer />
        <div className="w-3/6 mt-44 ml-14">
          <TopHeader
            style="text-3xl font-semibold my-3"
            text="Password Recovery"
          />
          <FormField
            text="email"
            textPlaceholder="Enter Email address"
            style="w-7/12"
            register={registerEmail}
          />

          <Button
            btnFunc={notify}
            btnText="Reset Password"
            style="px-11 mt-11 py-2 bg-purple-3 text-white rounded-md flex justify-center items-center hover:bg-purple-4"
          />
        </div>
      </section>
  );
}

export default ForgotPassword;
