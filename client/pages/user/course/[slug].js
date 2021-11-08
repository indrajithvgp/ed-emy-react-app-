import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import axios from "axios";
import UserRoute from '../../../components/routes/UserRoute'
import { useContext } from 'react';
import { Context } from '../../../context';


const SingleCourse = () => {
    const [loading, setLoading] = React.useState(false);

        const [course, setCourse] = React.useState({lessons:[], course:[]});

    // const {state:{user}} = useContext(Context)
    const router = useRouter()
    const {slug} = router.query

    useEffect(() => {
        if(slug) loadCourse()
    } ,[])
    
    async function loadCourse() {
        const {data} = await axios.get(`/api/course/${slug}`)
        setCourse(data)
    }

    

    return (
        <div>
            
        </div>
    )
}

export default SingleCourse