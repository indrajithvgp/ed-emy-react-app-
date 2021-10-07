import {useContext, useEffect} from 'react'
import {
  SyncOutlined,
  
} from "@ant-design/icons";
import {Context} from '../../context'
import axios from 'axios'

const StripeCallback = ()=>{
    const {state:{user}} = useContext(Context);

    useEffect(()=>{
        if(user){
            axios.post('/api/get-account-status').then(res=>{
                console.log(res)
                // window.href.location = "/instructor"
            })
        }
    },[user])

    return (
        <SyncOutlined spin className="d-flex justify-content-center display-1 text-danger p-5"/>
    )
}

export default StripeCallback