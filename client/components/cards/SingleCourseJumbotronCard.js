import React from 'react'

const SingleCourseJumbotronCard = ({}) => {
    return (
     
        <div className="jumbotron bg-primary square">
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
                  ? currencyFormatter({ amount: price, currency: usd })
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
                    light={image.Location}
                  />
                </div>
              ) : (
                <>
                  <img
                    src={image.Location}
                    className="img img-fluid"
                    alt="course"
                  />
                </>
              )}
            </div>
          </div>
        </div>
     
    );
}

export default SingleCourseJumbotronCard
