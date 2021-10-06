import { useContext } from "react";
import { Context } from "../../context";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context); 

  return (
      <UserRoute>
        <h1 className="jumbotron text-center square">
          <pre>User Dashboard</pre>
        </h1>
      </UserRoute>
  );
};

export default UserIndex;
