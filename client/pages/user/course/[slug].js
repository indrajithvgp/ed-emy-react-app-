import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import axios from "axios";
import UserRoute from '../../../components/routes/UserRoute'
import { useContext } from 'react';
import { Context } from '../../../context';


const SingleCourse = () => {
    // const {state:{user}} = useContext(Context)
    const router = useRouter()
    
    return (
        <div>
            
        </div>
    )
}

export default SingleCourse