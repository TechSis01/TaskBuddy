import FormField from "./FormField";
import Button from "../Button";
import TopHeader from "./TopHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { promise } from "../services/appwriteConfig";
import { useState,useEffect } from "react";
import Logo from "../Logo";
import logo from "../Images/brandName.png";
function ForgotPassword() {
  const [userEmail, setUserEmail] = useState("");

  // State to check password validity
  const [loginPasswordValidity, setLoginPasswordValidity] = useState(false);

  // State to handle button Clickability
  const [buttonClick, setButtonClick] = useState(true); 

  const notify = async (e) => {
    registerEmail(e);
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
        "https://taskbuddy-mu.vercel.app/resetPassword"
      );
    } catch (e) {
      console.log("error");
    }
  };

  // Email for password recovery
  const registerEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const activateButton = () => {
    let emailRegex = /^[\w.-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,3}$/;
    if (emailRegex.test(userEmail)) {
      setButtonClick(false);
    } else if (
      !emailRegex.test(userEmail)
    ) {
      setButtonClick(true);
    }
  };

  useEffect(() => {
    activateButton();
  }, [userEmail]);


  return (
    <section className=" w-3/6 ">
      <ToastContainer />

      <div className="w-full mt-32 ml-14">
        <Logo style="w-60 mt-32" image={logo} altText="brandlogo" />
        <div className="ml-9">
          <TopHeader
            style="text-3xl font-semibold my-3 text-purple-4"
            text="Password Recovery"
          />
          <FormField
            text="email"
            textPlaceholder="Enter Email address"
            style="w-7/12"
            register={registerEmail}
          />

          <Button
           btnclick={buttonClick}
            btnFunc={notify}
            btnText="Reset Password"
            style={`pr-11 py-2 my-5 ${
                buttonClick ? "bg-purple-400 hover:bg-purple-400" : "bg-purple-3"
              } text-white w-7/12 rounded-md flex justify-center items-center hover:bg-purple-4`}
          />
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
