import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import axios from "axios";
import { useState, useEffect } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";
import Link from 'next/link'


const style = {
  marginTop: "-3px",
  fontSize: "10px",
};

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };
  useEffect(() => {
    loadCourses();
  }, []);
  console.log(courses)
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square p-2">Instructor Dashboard</h1>
      {courses &&
        courses.map((course) => (
          <>
            <div className="d-flex mb-5">
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="media-body flex-grow-1 ms-3 md-3 pl-2">
                <div className="row">
                  <div className="col">
                    <Link
                      className="pointer"
                      href={`/instructor/course/view/${course.slug}`}
                    >
                      <a className="text-primary">
                        <h5 className="mt-2">{course.title}</h5>
                      </a>
                    </Link>
                    <p style={{ marginTop: "0px" }}>
                      {course.lessons.length} Lessons
                    </p>
                    {course.lessons.length < 5 ? (
                      <p style={style} className="text-warning">
                        Atleast 5 Lessons are required to Publish a Course
                      </p>
                    ) : course.published ? (
                      <p style={style} className="text-success">
                        Your Course is Live in the Marketplace
                      </p>
                    ) : (
                      <p style={style} className="text-success">
                        You Course is ready to be published
                      </p>
                    )}
                  </div>
                  <div className="col-md-3 mt-3 text-center">
                    {course.published ? (
                      <Tooltip title="Published">
                        <CheckCircleOutlined
                          style={{ fontSize: "35px" }}
                          className="h5 pointer text-success"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Unpublished">
                        <CloseCircleOutlined
                          style={{ fontSize: "35px" }}
                          className="h5 pointer text-warning"
                        />
                      </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;
