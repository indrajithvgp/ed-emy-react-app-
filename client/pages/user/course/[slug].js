import React, { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoute from "../../../components/routes/UserRoute";
import { useContext } from "react";
import { Context } from "../../../context";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Avatar, Menu, Dropdown, Icon, message } from "antd";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [course, setCourse] = useState({lessons:[]});
  const [updateState, setUpdateState] = useState(false)

  // const {state:{user}} = useContext(Context)
  const router = useRouter();
  const { slug } = router.query;
  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    console.log(data);
    setCourse(data);
  };
  useEffect(() => {
    if (slug) {
      loadCourse();
    }
  }, [slug]);

  useEffect(() => {
    if (course) {
      loadCompletedLessons();
    }
  }, [course]);

  async function loadCompletedLessons() {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    setCompletedLessons(data);
  }

  console.log(course, completedLessons);

  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      const all = completedLessons;
      const index = all.indexOf(course.lessons[clicked]._id);
      if (index > -1) {
        all.splice(index, 1);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function markCompleted() {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  }

  return (
    <StudentRoute>
      <div className="row">
        <div style={{ maxWidth: 320 }}>
          <Button
            className="text-primary mt-1 btn-block mb-2"
            onClick={() => setCollapsed(!collapsed)}
          >
            {createElement(collapsed ? MenuFoldOutlined : MenuUnfoldOutlined)}{" "}
            {!collapsed && "Lessons"}
          </Button>
          <Menu
            defaultSelectedKeys={[clicked]}
            inlineCollapsed={collapsed}
            style={{
              height: "80vh",
              overflow: "scroll",
              backgroundColor: "#DFD7C8",
            }}
          >
            {course.lessons &&
              course.lessons.map((lesson, index) => (
                <Menu.Item
                  onClick={() => setClicked(index)}
                  key={index}
                  icon={<Avatar>{index + 1}</Avatar>}
                >
                  {lesson.title.substring(0, 30)}{" "}
                  {completedLessons.includes(lesson._id) ? (
                    <CheckCircleFilled
                      className="text-primary ms-auto ml-2"
                      style={{ marginTop: "13px" }}
                    />
                  ) : (
                    <MinusCircleFilled
                      className="text-danger ms-auto ml-2"
                      style={{ marginTop: "13px" }}
                    />
                  )}
                </Menu.Item>
              ))}
          </Menu>
        </div>
        <div className="col">
          {clicked !== -1 ? (
            <>
              <div className="col alert alert-primary square">
                <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                {completedLessons.includes(course.lessons[clicked]._id) ? (
                  <span className="ms-auto pointer" onClick={markIncompleted}>
                    Mark as Incompleted
                  </span>
                ) : (
                  <span className="ms-auto pointer" onClick={markCompleted}>
                    Mark as Completed
                  </span>
                )}
              </div>
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div className="wrapper">
                      <ReactPlayer
                        className="player"
                        url={course.lessons[clicked].video.Location}
                        width="100%"
                        height="100%"
                        controls={true}
                        onEnded={()=> markCompleted()}
                      />
                    </div>
                  </>
                )}
              <ReactMarkdown
                source={course.lessons[clicked].content}
                className="single-post"
              />
            </>
          ) : (
            <>
              <div className="d-flex justify-content-center p-5">
                <div className="text-center p-5">
                  <PlayCircleOutlined className="text-primary display-1 p-5" />
                  <p className="lead">Click on the lesson to start learning</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
