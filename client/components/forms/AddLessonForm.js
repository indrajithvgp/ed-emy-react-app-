import { useState, useContext, useEffect } from "react";
import { Select, Button, Avatar, Badge } from "antd";
import { SaveOutlined } from "@ant-design/icons";
const { Option } = Select;

const AddLessonForm = ({
  handleLesson,
  setValues,
  values,
  uploading,
  setUploading,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={() => handleLesson()} className="">
        <input
          className="form-control square"
          type="text"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          values={values.title}
          placeholder="Title"
          autoFocus
          required
        />
        <textarea
          className="form-control mt-3"
          col="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          values={values.content}
          placeholder="Content"
        />
        <Button
          onClick={() => handleLesson()}
          className="col-mt-3"
          size="large"
          type="primary"
          loading={uploading}
          shape="round"
        >
            Save
        </Button>
      </form>
    </div>
  );
};

export default AddLessonForm;
