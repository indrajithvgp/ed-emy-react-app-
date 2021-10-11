import { useState, useContext, useEffect } from "react";
import { Select, Button, Avatar } from "antd";
import { SaveOutlined } from "@ant-design/icons";
const { Option } = Select;

const CreateCourseForm = ({
  handleSubmit,
  handleChange,
  handleImage,
  values,
  uploadButtonText,
  setValues,
  preview,
}) => {
  const children = [];
  for (let i = 9.99; i < 99.99; i++) {
    children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>);
  }

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
      <div className="form-group">
        <textarea
          name="description"
          cols="7"
          rows="7"
          value={values.description}
          className="form-control"
          onChange={handleChange}
        ></textarea>
      </div>
      {
        <div className="col">
          <div className="form-group">
            <Select
              style={{ width: "100%" }}
              size="large"
              value={values.paid}
              onChange={(e) => setValues({ ...values, paid: !values.paid })}
            >
              <Option value={true}>Paid</Option>
              <Option value={false}>Free</Option>
            </Select>
          </div>
          {values.paid && (
            <div className="form-group">
              <Select
                style={{ width: "100%" }}
                defaultValue="$9.99"
                tokenSeparators={[,]}
                size="large"
                onChange={(e) =>
                  setValues({ ...values, price: e.target.value })
                }
              >
                {children}
              </Select>
            </div>
          )}
        </div>
      }
      <div className="form-group">
        <input
          type="text"
          name="category"
          className="form-control"
          placeholder="Category"
          value={values.category}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <div className="col">
          <div className="form-group">
            <label className="btn btn-outline-secondary btn-block text-left">
              {values.loading
                ? `Uploading ${uploadButtonText}`
                : uploadButtonText}
              <input
                type="file"
                name="image"
                onChange={handleImage}
                accept="/image"
                hidden
              />
            </label>
          </div>
        </div>
        {preview && <Avatar width={200} src={preview} />}
      </div>
      <div className="row">
        <div className="col">
          <Button
            disabled={values.loading || values.uploading}
            onClick={handleSubmit}
            className="btn btn-primary"
            type="primary"
            size="large"
            shape="round"
            loading={values.loading}
            icon={<SaveOutlined />}
          >
            {values.loading ? "Saving.." : "Save & Continue"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CreateCourseForm;
