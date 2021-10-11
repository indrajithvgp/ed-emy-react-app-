import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { useEffect, useState } from "react";
import CreateCourseForm from "../../../components/forms/CreateCourseForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
const CreateCourse = () => {
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
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(e.target.files[0]));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let {data} = await axios.post('/api/course/upload-image', {
          image: uri,
        })
        console.log("Image data", data)
        setValues({ ...values, loading: false });
      } catch (err) {
        setValues({ ...values, loading: false });
        toast.error("Image Upload Failed, Please try again");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
        />
      </div>
    </InstructorRoute>
  );
};

export default CreateCourse;
