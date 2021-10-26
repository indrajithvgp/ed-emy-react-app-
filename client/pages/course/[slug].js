import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import {useRouter } from 'next/router'

const SingleCourse = ({course})=>{
    // const router = useRouter()
    // const {slug} = router.query

    return (<>
    <div className="container-fluid">
        <div className="row">{course.slug}</div>
    </div>
    </>)
}

//context - req,res, query, params
export async function getServideSideProps({req, query}) {
  const { data } = await axios.get(`http://localhost:3000/api/course/${query.slug}`);
  
  return {
    props: {
      course: data,
    },
  };
}

export default SingleCourse