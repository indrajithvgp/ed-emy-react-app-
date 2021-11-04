import { useContext, useEffect } from "react";
import { Context } from "../../context";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context); 

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    loadCourse();
  }, []);
  async function loadCourse() {
    const { data } = await axios.get(`/api/courses`);
    // console.log(data);
    setCourses(data)
  }

  return (
      <UserRoute>
        <h1 className="jumbotron text-center square p-3">
          <pre>User Dashboard</pre>
        </h1>
      </UserRoute>
  );
};

export default UserIndex;
