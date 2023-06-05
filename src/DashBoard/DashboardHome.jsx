import { UserContext } from "../App";
import { useContext, useState } from "react";
import { promise } from "../services/appwriteConfig";
import { Link } from "react-router-dom";
import Preloader from "../OtherComponents/Preloader";
import FormField from "../Authentication/FormField";
import { RxMagnifyingGlass } from "react-icons/rx";
import Button from "../Button";

function DashboardHome() {
  const {
    userDetails,
    currentUser,
    loader,
    setLoader,
    isUserInvalid,
    setIsUserInvalid,
  } = useContext(UserContext);
  // const [emailVerified, setEmailVerified] = useState(false)
  // const userDeets = async ()=>{
  //   let user = await promise.get();
  //   console.log(user.emailVerification)
  //   if(user.emailVerification === true){
  //     setEmailVerified(true)
  //   }
  // }
  let searchIcon = <RxMagnifyingGlass />;
  return (
    <section className="lg:w-8/12">
      {/* <button onClick={userDeets}>GET</button>
       {emailVerified ? <p>User has been verified</p> : <p>User is unverified</p>} */}
      {loader && <Preloader />}
      {loader && <div>loading, please wait</div>}
      {isUserInvalid && (
        <section>
          <p>This is an Invalid User</p>{" "}
          <Link to="/login">Go back to login</Link>
        </section>
      )}
      {!loader && !isUserInvalid && (
        <section className="pt-4 px-4">
          <h1 className="text-3xl"> Hello {currentUser}!</h1>
          <p className="py-5">What do you want to do today?</p>
          <FormField
            text="text"
            textPlaceholder="search tasks"
            style="w-full"
          />
          <h1 className="py-4">All Tasks</h1>
          <Link to="/newTask">
            <Button
              btnText="Add new Task"
              style="pr-11 py-2 text-white w-full rounded-md flex justify-center items-center bg-purple-4"
            />
          </Link>
        </section>
      )}
    </section>
  );
}

export default DashboardHome;
