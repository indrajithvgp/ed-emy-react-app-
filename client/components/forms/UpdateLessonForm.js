import { useState, useContext, useEffect } from "react";
import { Select, Button, Avatar, Badge, Progress, Switch } from "antd";
import { SaveOutlined, CloseCircleFilled } from "@ant-design/icons";
const { Option } = Select;
import ReactPlayer from "react-player";

const UpdateLessonForm = ({
  handleUpdateLesson,
  setValues,
  current,
  progress,
  handleVideo,
  uploadVideoText,
  uploading,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleUpdateLesson} className="">
        <input
          className="form-control square"
          type="text"
          onChange={(e) => setValues({ ...current, title: e.target.value })}
          value={current.title}
          placeholder="Title"
          autoFocus
          required
        />
        <textarea
          className="form-control mt-3"
          col="7"
          rows="7"
          onChange={(e) => setValues({ ...current, content: e.target.value })}
          value={current.content}
          placeholder="Content"
        />
        <div>
          {!uploading && current.video && current.video.Location && (
            <div className="pt-2 d-flex justify-content-center">
              <ReactPlayer
                url={current.video.Location}
                width="410px"
                height="240px"
                controls
              />
            </div>
          )}
          <label className="btn btn-block btn-dark text-left mt-3">
            {uploadVideoText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>
        </div>
        {progress > 0 && (
          <Progress
            className="d-flex justify-content-center pt-2"
            percent={progress}
            steps={10}
          />
        )}
        <div className="d-flex justify-content-between p-2">
          <span className="pt-3 badge">Preview</span>
          {/* {float-right} */}
          <Switch
            className="ms-auto mt-2"
            disabled={uploading}
            defaultChecked={current.free_preview}
            name="free_preview"
            onChange={(v) => setCurrent({ ...current, free_preview: v })}
          />
        </div>
        <Button
          onClick={handleUpdateLesson}
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

export default UpdateLessonForm;
