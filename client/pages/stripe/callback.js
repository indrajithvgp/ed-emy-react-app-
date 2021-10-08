import {useContext, useEffect, useState} from 'react'
import {
  SyncOutlined,
  
} from "@ant-design/icons";
import {Context} from '../../context'
import axios from 'axios'

const StripeCallback = ()=>{
    const {state:{user}, dispatch} = useContext(Context);
    const [error, setError] = useState("")

    useEffect(()=>{
        if(user){
            axios.post('/api/get-account-status', {user}).then(res=>{
                console.log(res)
                dispatch({
                    type:"LOGIN",
                    payload: res.data
                })
                window.localStorage.setItem("user", JSON.stringify(res.data))
                window.location.href = "/instructor"
            }).catch(err=> setError(err.message))
        }
    },[user])

    return (
      <>
        {error ? (
          <h1>Error..</h1>
        ) : (
          <SyncOutlined
            spin
            className="d-flex justify-content-center display-1 text-danger p-5"
          />
        )}
      </>
    );
}

export default StripeCallback