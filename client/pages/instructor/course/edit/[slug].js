import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import { Avatar, Tooltip, Card, Button, Modal, Item, Meta, List } from "antd";
import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import CreateCourseForm from "../../../../components/forms/CreateCourseForm";
import UpdateLessonForm from "../../../../components/forms/UpdateLessonForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const EditCourse = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: 9.99,
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
    category: "",
    lessons: [],
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [uploadVideoText, setUploadVideoText] = useState("Upload Video");
  const [progress, setProgress] = useState(false);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    loadCourse();
  }, [slug]);
  async function loadCourse() {
    const { data } = await axios.get(`/api/course/${slug}`);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleRemove = async () => {
    setValues({ ...values, loading: true });
    const res = await axios.post("/api/course/remove-image", { image });
    try {
      setImage({});
      setPreview("");
      setValues({ ...values, loading: false });
      setUploadButtonText("Upload Image");
    } catch (err) {
      setValues({ ...values, loading: false });
      toast.error("Image Upload Failed, Please try again");
    }
  };
  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(e.target.files[0]));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("Image data", data);
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast.error("Image Upload Failed, Please try again");
      }
    });
  };
  const handleDrag = (e, index) => {
    e.dataTransfer.setData("itemIndex", index);
    console.log("a");
  };
  const handleDrop = async (e, index) => {
    console.log("b");
    const moving = e.dataTransfer.getData("itemIndex");
    const target = index;
    let allLessons = values.lessons;
    let movingItem = allLessons[moving];
    allLessons.splice(moving, 1);
    allLessons.splice(target, 0, movingItem);
    setValues({ ...values, lessons: [...allLessons] });
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image: image,
    });
    toast.success("All Set..");
  };

  const handleDelete = async (index, item) => {
    const answer = window.confirm("Are You Sure You Want to Delete?");
    if (!answer) return;
    let allLessons = values.lessons;
    let removed = allLessons.splice(index, 1);
    console.log(removed);
    setValues({ ...values, lessons: allLessons });
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image: image,
      });
      toast.success("Course Updated..");

      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const handleVideo = async (e) => {
    if (current.video && current.video.Location) {
      const { data } = await axios.post(
        `/api/course/remove-video/${values.instructor._id}`,
        current.video
      );
    }
    const video = e.target.files[0];
    console.log(video)
    setUploadVideoText(video.name);
    setUploading(true);
    const videoData = new FormData();
    videoData.append("video", video);
    videoData.append("courseId", values._id);
    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) => Math.round((100 * e.loaded) / e.total),
      }
    );
    console.log(data);
    setCurrent({ ...current, video: data });
    setUploading(false);
  };

  const handleUpdateLesson = async (e) => {
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoText("Upload Video");
    setVisible(false);
    
    if(data.ok){
      let arr = values.lessons
      const index = arr.findIndex((el)=>el._id===current._id)
      arr[index] = current
      setValues({...values, lessons: arr})
      toast("Lesson Updated Successfully")
    }
  };
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square p-2">Update Course</h1>
      <div className="pt-3 pb-3">
        <CreateCourseForm
          handleSubmit={handleSubmit}
          handleImage={handleImage}
          handleChange={handleChange}
          uploadButtonText={uploadButtonText}
          values={values}
          setValues={setValues}
          preview={preview}
          handleRemove={handleRemove}
          editPage={true}
        />
      </div>
      <hr />
      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <List.Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <List.Item.Meta
                  onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                  }}
                  title={item.title}
                  avatar={<Avatar>{index + 1}</Avatar>}
                ></List.Item.Meta>
                <DeleteOutlined
                  className="text-danger ms-auto"
                  onClick={() => handleDelete(index)}
                />
              </List.Item>
            )}
          ></List>
        </div>
      </div>
      <Modal
        center
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        title="Update Lesson"
      >
        <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleUpdateLesson={handleUpdateLesson}
          handleVideo={handleVideo}
          uploadVideoText={uploadVideoText}
          progress={progress}
          uploading={uploading} 
        />
      </Modal>
    </InstructorRoute>
  );
};

export default EditCourse;
