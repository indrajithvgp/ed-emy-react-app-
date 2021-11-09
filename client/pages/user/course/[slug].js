import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoute from "../../../components/routes/UserRoute";
import { useContext } from "react";
import { Context } from "../../../context";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Avatar, Menu, Dropdown, Icon, message } from "antd";

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

  return (
    <StudentRoute>
      <div className="row">
        <div style={{ maxWidth: 320 }}>
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
                    <ReactMarkdown source={course.lessons[clicked].content} className="single-post"/>
                  </>
                )}
            </>
          ) : (
            <>
            
            </>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
