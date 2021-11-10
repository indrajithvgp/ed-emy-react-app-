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
  MenuUnfoldOutlined,
} from "@ant-design/icons";
const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [course, setCourse] = useState({ lessons: [], course: [] });

  // const {state:{user}} = useContext(Context)
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, []);

  async function loadCourse() {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  }

  async function markCompleted(){
    const {data} = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id
    })
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
            style={{ height: "80vh", overflow: "scroll" }}
          >
            {course.lessons.map((lesson, index) => (
              <Menu.Item
                onClick={() => setClicked(index)}
                key={index}
                icon={<Avatar>{index + 1}</Avatar>}
              >
                {lesson.title.substring(0, 30)}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <div className="col">
          {clicked !== -1 ? (
            <>
            <div className="col alert alert-primary square">
              <b>{course.lessons[clicked].title.substring(0,30)}</b>
              <span className="ms-auto pointer" onClick={markCompleted}>Mark as Completed</span>
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
