import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

export default function Home() {
  const [courses, setCourses] = useState([])
  useEffect(()=>{
    async function fetchCourses(){
      const {data} =  await axios.get('/api/courses')
    setCourses(data)
    }
    fetchCourses()

  },[])
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square p-4">
        Online Education Marketplace
      </h1>
      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => <div className="col-md-4" key={course._id}></div>)}
        </div>
      </div>
    </>
  );
}
