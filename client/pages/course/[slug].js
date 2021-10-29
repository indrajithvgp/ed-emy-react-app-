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
    title,
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
        name={title}
        image={image}
        // video={video}
        paid={paid}
        category={category}
        setPreview={setPreview}
        setShowModal={setShowModal}
        showModal={showModal}
        lessons={lessons}
        price={price}
        preview={preview}
        description={description}
        updatedAt={updatedAt}
        createdAt={createdAt}
        instructor={instructor}
      />
    {/* <pre>
      {JSON.stringify(course, null, 4)}
    </pre> */}
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

export async function getServerSideProps({ query }) {
  const res = await axios.get(`http://localhost:3000/api/course/${query.slug}`);
  // console.log(res.data.title);
  return {
    props: {
      course: res.data,
    },
  };
}

export default SingleCourse;
