import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { currencyFormatter } from "../../utils/helpers";
import { Badge } from "antd";
import ReactPlayer from "react-player";
import SingleCourseJumbotronCard from "../../components/cards/SingleCourseJumbotronCard";
import PreviewModal from "../../components/modal/PreviewModal";
const SingleCourse = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const {
    name,
    description,
    updatedAt,
    createdAt,
    instructor,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

  return (
    <>
      <SingleCourseJumbotronCard
        name={name}
        image={image}
        video={video}
        paid={paid}
        category={category}
        setPreview={setPreview}
        setShowModal={setShowModal}
        showModal={showModal}
        price={price}
        preview={preview}
        description={description}
        updatedAt={updatedAt}
        createdAt={createdAt}
        instructor={instructor}
      />

      {showModal && <PreviewModal preview={preview} showModal={showModal} setShowModal={setShowModal}/>}
    </>
  );
};

//context - req,res, query, params
export async function getServideSideProps({ req, query }) {
  const { data } = await axios.get(
    `http://localhost:3000/api/course/${query.slug}`
  );

  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
