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

const SingleCourse = ({course}) => {
  console.log("course", course)
  return <>
        He
    </>
  ;
};

// //context - req,res, query, params
export async function getServideSideProps(context) {
  console.log(context);
 
  const { data } = await axios.get(
    `http://localhost:3000/api/course/${context.query.slug}`
  );
  console.log("data", data), query;
  return {
    props: {
      course: {name:"a"},
    },
  };
}

export default SingleCourse;
