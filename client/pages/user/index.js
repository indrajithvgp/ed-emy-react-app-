import { useContext, useEffect } from "react";
import { Context } from "../../context";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import {
  Avatar,
  Button,
  Card,
  Col,
  Icon,
  Row,
  Skeleton,
  Statistic,
} from "antd";
import Link  from "next/link";
import { useState } from "react";
import { SyncOutlined, PlayCircleOutlined } from "@ant-design/icons";
const UserIndex = () => {
  const {
    state: { user },
  } = useContext(Context);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadCourse();
  }, []);
  async function loadCourse() {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user-courses`);
      // console.log(data);
      setCourses(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <UserRoute>
      {loading && (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-danger p-1"
        />
      )}
      <div className="mt-2 mb-2 p-3 bg-info text-center bg-darkrounded">
        <h1 className="text-white">User Dashboard</h1>
      </div>
      {/* <h1 className="jumbotron text-center square p-3">
        <pre className="text-info">User Dashboard</pre>
      </h1> */}

      {courses &&
        courses.map((course, index) => (
          <div className="d-flex pt-2 pb-1" key={course._id}>
            <Avatar
              size={80}
              shape="square"
              src={course.image ? course.image.Location : "/course.png"}
            />
            <div className="flex-grow-1 ms-3 pl-2">
              <div className="row">
                <div className="col">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="pointer"
                  >
                    <a>
                      <h5 className="mt-2 text-primary">{course.title}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "0px" }}>
                    {course.lessons.length} Lessons
                  </p>
                  <p
                    style={{ marginTop: "-3px", fontSize: "-12px" }}
                    className="text-muted"
                  >
                    By {course.instructor.name}
                  </p>
                </div>
                <div className="col-md-3 mt-2 text-center">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="pointer"
                  >
                    <a>
                      <PlayCircleOutlined
                        style={{ fontSize: "50px" }}
                        className="h2 text-primary pointer"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
    </UserRoute>
  );
};

export default UserIndex;
