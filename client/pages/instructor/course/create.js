import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { useEffect, useState } from "react";
import CreateCourseForm from "../../../components/forms/CreateCourseForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import {useRouter} from "next/router";
const CreateCourse = () => {
  const router = useRouter()
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 9.99,
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
    category: "",
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

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
        console.log(err)
        setValues({ ...values, loading: false });
        toast.error("Image Upload Failed, Please try again");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/course", {
        ...values,
        image: image,
      });
      toast.success('Great. Now you can start adding lessons')
      router.push('/instructor')
      console.log(data);
    } catch (err) {
      toast.error(err.response.data)
    }
  };
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square p-2">Create Course</h1>
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
        />
      </div>
    </InstructorRoute>
  );
};

export default CreateCourse;
