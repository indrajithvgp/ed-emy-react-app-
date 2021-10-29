import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import CourseCard from '../components/cards/CourseCard'

function Home({courses}) {
  // const [courses, setCourses] = useState([])
  // useEffect(()=>{
  //   async function fetchCourses(){
  //     const {data} =  await axios.get('/api/courses')
  //   setCourses(data)
  //   }
  //   fetchCourses()

  // },[])
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square p-4">
        Online Education Marketplace
      </h1>
      <div className="container-fluid">
        <div className="row">
          {courses.map((course) => {
            return (
              <div key={course._id} className="col-md-4">
                <CourseCard course={course} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await axios.get(`http://localhost:3000/api/courses`);
  
  return {
    props: {
      courses: data,
    },
  };
} 

export default Home