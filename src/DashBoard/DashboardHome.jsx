import { UserContext } from "../App";
import { useContext,useState} from "react";
import { promise } from "../services/appwriteConfig";
function DashboardHome() {
  const { userDetails, currentUser, loader, setLoader } =
    useContext(UserContext);
  const [emailVerified, setEmailVerified] = useState(false)
  const userDeets = async ()=>{
    let user = await promise.get();
    console.log(user.emailVerification)
    if(user.emailVerification === true){
      setEmailVerified(true)
    }
  }
  

  return (
    <section>
       <button onClick={userDeets}>GET</button>
       {emailVerified ? <p>User has been verified</p> : <p>User is unverified</p>}
      {loader && <div>loading, please wait</div>}
      {!loader && <section>Welcome {currentUser}</section>}
    </section>
  );
}

export default DashboardHome;
