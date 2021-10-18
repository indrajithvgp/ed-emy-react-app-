import { useState, useContext, useEffect } from "react";
import { Select, Button, Avatar, Badge, Progress , Tooltip} from "antd";
import { SaveOutlined, CloseCircleFilled } from "@ant-design/icons";
const { Option } = Select;

const AddLessonForm = ({
  handleLesson,
  setValues,
  values,
  progress,
  handleRemoveVideo,
  setUploadButtonText,
  handlevideo,
  uploadButtonText,
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
        <div className="d-flex justify-content-center">
          <label className="btn btn-block btn-dark text-left mt-3">
            {uploadButtonText}
            <input onChange={handlevideo} type="file" accept="video/*" hidden />
          </label>
          {!uploading && values.video.Location && (
            <Tooltip title="remove">
              <span onClick={handleRemoveVideo} className="pt-1 pl-3">
                <CloseCircleFilled className="d-flex justify-content-center pt-4 pointer text-danger"/>
              </span>
            </Tooltip>
          )}
        </div>
        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}
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
