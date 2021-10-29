import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { currencyFormatter } from "../../utils/helpers";
import { Badge } from "antd";
import ReactPlayer from "react-player";
import SingleCourseJumbotronCard from "../../components/cards/SingleCourseJumbotronCard";
import SingleCourseComponent from "../../components/cards/SingleCourseComponent";
import PreviewModal from "../../components/modal/PreviewModal";

const SingleCourse = ({ course }) => {
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(false);
  // const router = useRouter();
  // const { slug } = router.query;
  const {
    // name,
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
  const name = "a";
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

      {showModal && (
        <PreviewModal
          preview={preview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

      {course.lessons && (
        <SingleCourseComponent
          lessons={course.lessons}
          showModal={showModal}
          setShowModal={setShowModal}
          setPreview={setPreview}
        />
      )}
    </>
  );
};

//context - req,res, query, params
export async function getServideSideProps({ req, query }) {
  console.log(query);
  const { data } = await axios.get(
    `http://localhost:3000/api/course/${query.slug}`
  );
  console.log(data);
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse;
