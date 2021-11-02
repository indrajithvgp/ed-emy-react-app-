import React from "react";
import { List, Badge, Button } from "antd";
import { LoadingOutlined, SafetyOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";
import { currencyFormatter } from "../../utils/helpers";
const SingleCourseJumbotronCard = ({
  name,
  description,
  instructor,
  price,
  category,
  loading,
  enrolled,
  setEnrolled,
  handlePaidEnrollment,
  handleFreeEnrollment,
  user,
  paid,
  updatedAt,
  setPreview,
  setShowModal,
  showModal,
  preview,
  createdAt,
  lessons,
  image,
}) => {
  // console.log(lessons, paid)
  return (
    <div className="jumbotron bg-primary square p-3">
      <div className="row">
        <div className="col-md-8">
          <h1 className="text-light font-weight-bold">{name}</h1>
          <p className="lead">
            {description && description.substring(0, 160)}...
          </p>
          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-4 mr-2"
          />
          <p>Created by {instructor.name}</p>
          <p>Last updated: {new Date(updatedAt).toLocaleString()}</p>
          <h4 className="text-light">
            {paid
              ? currencyFormatter({ amount: price, currency: "usd" })
              : "Free"}
          </h4>
        </div>

        <div className="col-md-4">
          {lessons[0].video && lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0].video.Location}
                width="100%"
                height="225px"
                light={image && image.Location}
              />
            </div>
          ) : (
            <>
              <img
                src={image&&image.Location}
                className="img img-fluid"
                alt="course"
              />
            </>
          )}
          {loading ? (
            <div className="d-flex justify-content-center">
              <LoadingOutlined className="h1 text-danger" />
            </div>
          ) : (
            <Button
              className="mb-3 mt-3"
              type="danger"
              block
              shape="round"
              icon={<SafetyOutlined />}
              size="large"
              disabled={loading}
              onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
            >
              {user
                ? enrolled.status
                  ? "Go to Course"
                  : "Enroll"
                : "Login to Enroll"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotronCard;
