import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import { Avatar, Tooltip, Button, Modal } from "antd";
import { CheckOutlined, EditOutlined, UploadOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AddLessonForm from "../../../../components/forms/AddLessonForm";
const CourseView = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [values, setValues] = useState({
    title:"",
    content:"",
    video:""
  })

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };
  const handleLesson=(e)=>{
    e.preventDefault()
  }
  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {/* <pre>
            {JSON.stringify(course,null,4)}
        </pre> */}
        {course && (
          <div className="container-fluid pt-1">
            <div className="media pt-2" style={{ display: "flex" }}>
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="media-body pl-2">
                <div
                  className="row"
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div className="col">
                    <h5 className="mt-2 text-primary">{course.title}</h5>
                    <p style={{ marginTop: "-10px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-10px", fontSize: "10px" }}>
                      {course.category}
                    </p>
                  </div>

                  <div className="d-flex pt-2">
                    <Tooltip title="edit">
                      <EditOutlined className="h5 pointer text-warning mr-4" />
                    </Tooltip>
                    <Tooltip title="publish">
                      <CheckOutlined className="h5 pointer text-danger mr-4" />
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <ReactMarkdown
                  children={course && course.description}
                  // remarkPlugins={[remarkGfm]}
                />
              </div>
            </div>
            <div className="row">
              <Button
                size="large"
                icon={<UploadOutlined />}
                onClick={() => {
                  setVisible(true);
                }}
                type="primary"
                shape="round"
                className="col-md-6 offset-md-3 text-center"
              >
                Add Lesson
              </Button>
            </div>
            <Modal
              visible={visible}
              title="+ Add Lesson"
              footer={null}
              centered
              onCancel={() => setVisible(false)}
            >
              <AddLessonForm
                handleLesson={handleLesson}
                uploading={uploading}
                setUploading={setUploading}
                values={values}
                setValues={setValues}
              />
            </Modal>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
