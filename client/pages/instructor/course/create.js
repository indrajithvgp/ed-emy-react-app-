import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";
import { useEffect, useState, useContext } from "react";
const CreateCourse = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: 9.99,
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const createForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={values.name}
          />
        </div>
      </form>
    );
  };
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Create Course</h1>
      <div className="pt-3 pb-3">{createForm()}</div>
    </InstructorRoute>
  );
};

export default CreateCourse;
