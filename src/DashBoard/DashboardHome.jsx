import { UserContext } from "../App";
import { useContext } from "react";
function DashboardHome() {
  const { userDetails, currentUser,loader, setLoader } = useContext(UserContext);
  return (
    <section>
      {loader && <div>loading, please wait</div>} 
      {!loader && <section>Welcome {currentUser}</section>}
    </section>
  );
}

export default DashboardHome;
