import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import { Avatar, Tooltip, Card, Button, Modal, Item, Meta, List } from "antd";
import {
  CheckOutlined,
  EditOutlined,
  UserSwitchOutlined,
  UploadOutlined,
  CloseOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import AddLessonForm from "../../../../components/forms/AddLessonForm";

const CourseView = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [students, setStudents] = useState(0);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  useEffect(() => {
    course && studentsCount();
  }, [course]);
  async function studentsCount() {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    });
    setStudents(data.length);
  }
  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };
  const handleRemoveVideo = async (e) => {
    setUploading(true);
    try {
      const { data } = await axios.post(
        `/api/course/remove-video/${course.instructor._id}`,
        values.video
      );
      setValues({ ...values, video: {} });
      setUploadButtonText("Upload Another Video");
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Video Remove Failed");
    }
  };
  const handleLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({ ...values, title: "", content: "", video: {} });
      setVisible(false);
      setUploadButtonText("Upload Video");
      setCourse(data);
      toast("Lesson Added");
    } catch (err) {
      console.log(err);
      toast("Lesson Add Failed");
    }
  };
  const handlePublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once You Publish Course, Users can Enroll for Course in the Marketplace ?"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/publish/${courseId}`);
      setCourse(data);
      toast.success("Your Course is Live");
    } catch (err) {
      toast.error("Course has not published");
    }
  };
  const handleUnpublish = async (e, courseId) => {
    try {
      let answer = window.confirm(
        "Once you Unpublish the Course, it will no longer be in the Marketplace. Sure You Want to Unpublish ?"
      );
      if (!answer) return;
      const { data } = await axios.put(`/api/course/unpublish/${courseId}`);
      setCourse(data);
      toast.success("Your Course is Unpublished");
    } catch (err) {
      toast.error("Course has not unpublished");
    }
  };
  const handlevideo = async (e) => {
    setUploading(true);
    try {
      const file = e.target.files[0];
      setUploadButtonText(file.name);
      let videoData = new FormData();
      videoData.append("video", file);

      const { data } = await axios.post(
        `/api/course/video-upload/${course.instructor._id}`,
        videoData,
        {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total));
          },
        }
      );
      console.log(videoData);
      setValues({ ...values, video: data });
      setUploading(false);
    } catch (err) {
      console.log(err);
      setUploading(false);
      toast.error("Video Upload Failed");
    }
  };
  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {/* <pre>
            {JSON.stringify(course,null,4)}
        </pre> */}
        {course && (
          <div className="container-fluid  pt-1">
            <div className="media pt-2" style={{ display: "flex" }}>
              <Avatar
                size={80}
                src={course.image ? course.image.Location : "/course.png"}
              />
              <div className="media-body d-flex flex-grow-1 ms-3 pl-2">
                <div
                  className="row"
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div className="col">
                    <h5 className="mt-3 text-primary">{course.title}</h5>
                    <p style={{ marginTop: "0px" }}>
                      {course.lessons && course.lessons.length} Lessons
                    </p>
                    <p style={{ marginTop: "-10px", fontSize: "10px" }}>
                      <span className="fw-bold fst-italic text-info">
                        Category-
                      </span>{" "}
                      {course.category}
                    </p>
                  </div>

                  <div className="d-flex pt-2">
                    <Tooltip
                      className="flex-grow-1"
                      title={`${students} Enrolled`}
                    >
                      <UserSwitchOutlined className="h5 pointer text-info " />
                    </Tooltip>
                    <Tooltip className="flex-grow-1" title="Edit">
                      <EditOutlined
                        onClick={() =>
                          router.push(`/instructor/course/edit/${slug}`)
                        }
                        className="h5 pointer text-warning mr-4"
                      />
                    </Tooltip>
                    {course.lessons && course.lessons.length < 5 ? (
                      <Tooltip
                        className="flex-grow-1"
                        title="Min 5 Lessons required to publish"
                      >
                        <QuestionOutlined className="h5 pointer text-danger" />
                      </Tooltip>
                    ) : course.published ? (
                      <Tooltip className="flex-grow-1" title="Unpublish">
                        <CloseOutlined
                          onClick={(e) => handleUnpublish(e, course._id)}
                          className="h5 pointer text-danger"
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Publish">
                        <CheckOutlined
                          onClick={(e) => handlePublish(e, course._id)}
                          className="h5 pointer text-success mr-4"
                        />
                      </Tooltip>
                    )}
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
                progress={progress}
                setProgress={setProgress}
                uploadButtonText={uploadButtonText}
                handlevideo={handlevideo}
                handleRemoveVideo={handleRemoveVideo}
                setUploadButtonText={setUploadButtonText}
                setValues={setValues}
              />
            </Modal>
            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length}{" "}
                  {course && course.lessons && course.lessons.length == 1
                    ? "Lesson"
                    : " Lessons"}
                </h4>
                <List
                  itemLayout="horizontal"
                  dataSource={course && course.lessons}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.title}
                        avatar={<Avatar>{index + 1}</Avatar>}
                      ></List.Item.Meta>
                    </List.Item>
                  )}
                ></List>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
