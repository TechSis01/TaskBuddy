import { UserContext } from "../App";
import { useContext } from "react";
function DashboardHome() {
  const { userDetails, currentUser,loader, setLoader } = useContext(UserContext);
  return (
    <section>
      {loader && <div>loading, please wait</div>} 
      {!loader && <section>Welcome {currentUser}</section>}
      <h1>welcome</h1>
    </section>
  );
}

export default DashboardHome;
