import { List } from 'antd'
import React from 'react'

const SingleCourseComponent = ({
  showModal,
  setShowModal,
  setPreview,
  lessons,
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col lesson-list">
          {lessons && <h4>{lessons.length} Lessons</h4>}
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                  {item.video !== null && item.free_preview && (
                    <span
                    className="text-primary pointer"
                      onClick={() => {
                        setPreview(item.video.Location);
                        setShowModal(!showModal);
                      }}
                    >Preview</span>
                  )}
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseComponent
