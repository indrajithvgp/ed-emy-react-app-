import { useState, useContext, useEffect } from "react";
import ReactPlayer from "react-player";
import React from "react";
import {Modal} from 'antd'

const PreviewModal = ({ setShowModal, preview, showModal }) => {
  return (
    <>
      <Modal
        title="Course Preview"
        visible={showModal}
        onCancel={() => setShowModal(!showModal)}
        width={720}
        footer={null}
      >
        <div className="wrapper">
          <ReactPlayer
            url={preview}
            playing={showModal}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      </Modal>
    </>
  );
};

export default PreviewModal;
