import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
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
  const [progress, setProgress] = useState(0);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });

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
      toast.error("Video remove Failed");
    }
  };
  const handleLesson = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values
      );
      setValues({...values, title:"", content:"", video:{}})
      setVisible(false)
      setUploadButtonText('Upload Video')
      setCourse(data)
      toast('Lesson Added')
    } catch (err) {
      console.log(err)
      toast("Lesson Add Failed");
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
                <h4>{course && course.lessons && course.lessons.length} Lessons</h4>
                <List itemLayout="horizontal" dataSource={course && course.lessons} renderItem={(item, index)=>{
                  <Item>
                    <Item.Meta title={item.title} avatar={<Avatar>{index+1}</Avatar>}>

                    </Item.Meta>
                  </Item>
                }}>

                </List>
              </div>
            </div>
          </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
