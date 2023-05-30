import FormField from "./FormField";
import Carousel from "./Carousel";
import signUpImages from "./SignupImages";
import TopHeader from "./TopHeader";
import { Link } from "react-router-dom";
import Button from "../Button";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { useState } from "react";
import { promise } from "../services/appwriteConfig";
function ResetPassword() {
  // STATE TO CHANGE PASSWORD
  const [passwordChange, setPasswordChange] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const newPasswordChange = (e) => {
    setPasswordChange({
      ...passwordChange,
      newPassword: e.target.value,
    });
  };
  const confirmPasswordChange = (e) => {
    setPasswordChange({
      ...passwordChange,
      confirmPassword: e.target.value,
    });
  };

  
  //   Change password click button
  const changePassword = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");
    try{
        await promise.updateRecovery(userId,secret,passwordChange.newPassword,passwordChange.confirmPassword)
    }
    catch(e){
        console.log("Error")
    }
  };
  //  State to change password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Function to change password visibility
  const showPassword = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <section className="flex">
      <div className="w-3/6 mt-44 ml-14">
        <TopHeader
          style="text-3xl font-semibold my-3"
          text="Reset Your Password"
        />
        <div className="flex items-center justify-between w-7/12 border outline-none my-3 border-gray-1 px-2 rounded-md ring-0">
          <FormField
            text={passwordVisible ? "text" : "password"}
            textPlaceholder="new password"
            style="w-full flex-grow border-0 pr-28"
            register={newPasswordChange}
          />
          <div onClick={showPassword} className="w-4">
            {passwordVisible ? <VscEye /> : <VscEyeClosed />}
          </div>
        </div>
        <div className="flex items-center justify-between w-7/12 border outline-none my-3 border-gray-1 px-2 rounded-md ring-0">
          <FormField
            text={passwordVisible ? "text" : "password"}
            textPlaceholder="confirm new password"
            style="w-full flex-grow border-0 pr-28"
            register={confirmPasswordChange}
          />
          <div onClick={showPassword} className="w-4">
            {passwordVisible ? <VscEye /> : <VscEyeClosed />}
          </div>
        </div>
        <Link to="/login">
          <Button
            btnFunc={changePassword}
            btnText="Change Password"
            style="px-11 mt-11 py-2 bg-purple-3 text-white rounded-md flex justify-center items-center hover:bg-purple-4"
          ></Button>
        </Link>
      </div>
      <Carousel carouselImages={signUpImages} />
    </section>
  );
}

export default ResetPassword;
