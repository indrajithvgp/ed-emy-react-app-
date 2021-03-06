import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { currencyFormatter } from "../../utils/helpers";
import { Badge, Button } from "antd";
import ReactPlayer from "react-player";
import SingleCourseJumbotronCard from "../../components/cards/SingleCourseJumbotronCard";
import SingleCourseComponent from "../../components/cards/SingleCourseComponent";
import PreviewModal from "../../components/modal/PreviewModal";
import { Context } from "../../context/index";
import {loadStripe} from '@stripe/stripe-js';
const SingleCourse = ({ course }) => {
  const {
    state: { user },
  } = useContext(Context);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const router = useRouter();
  // const { slug } = router.query;
  const handlePaidEnrollment = async() => {
    try {
      if (!user) router.push("/login");
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);
      setLoading(true);
      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({sessionId: data});
      toast.success(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      // toast.error("Enrollment Failed, Please try again");
      setLoading(false);
    }
  };
  const handleFreeEnrollment = async(e) => {
    e.preventDefault();
    try{
      if(!user) router.push("/login");
      if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`);

      setLoading(true); 
      const {data} = await axios.post(`/api/free-enrollment/${course._id}`);
      toast.success(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`)
    }catch(err){
      // toast.error("Enrollment Failed, Please try again");
      setLoading(false);
    }
  };

  async function checkEnrollment() {
    const {data} = await axios.get(`/api/check-enrollment/${course._id}`);
    setEnrolled(data);
  }
  useEffect(() => {
    if(user && course) checkEnrollment();

  },[user, course]);
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
        user={user}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
        loading={loading}
        preview={preview}
        description={description}
        updatedAt={updatedAt}
        enrolled={enrolled}
        setEnrolled={setEnrolled}
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
