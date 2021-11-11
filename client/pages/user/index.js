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
      <h1 className="jumbotron text-center square p-3">
        <pre>User Dashboard</pre>
      </h1>

      {courses &&
        courses.map((course, index) => (
          <div className="media pt-2 pb-1" key={course._id}>
            <Avatar
              size={80}
              shape="square"
              src={course.image ? course.image.Location : "/course.png"}
            />
            <div className="media-body pl-2">
              <div className="row">
                <div className="col">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="pointer"
                  >
                    <a>
                      <h5 className="mt-2 text-primary">{course.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>{course.lessons.length} Lessons</p>
                  <p
                    style={{ marginTop: "-15px", fontSize: "-12px" }}
                    className="text-muted"
                  >
                    By {course.instructor.name}
                  </p>
                </div>
                <div className="col-md-3 mt-3 text-center">
                  <Link
                    href={`/user/course/${course.slug}`}
                    className="pointer"
                  >
                    <a>
                      <PlayCircleOutlined className="h2 text-primary pointer"/>
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
