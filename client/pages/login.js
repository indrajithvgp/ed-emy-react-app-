import { useState, useContext , useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import {Context} from '../context'
import {useRouter} from 'next/router';

const Login = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(state.user!==null) router.push('/')
  }, [state.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`api/login`, {
        
        email,
        password,
      });
      console.log(data)
      setLoading(false);
      dispatch({
        type: 'LOGIN',
        payload: data
      })
      localStorage.setItem('user', JSON.stringify(data))
      toast.success("Login Successful. ");
      router.push("/user")

      console.log(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <h1 className="jumbotron  bg-primary text-center square p-4">Login</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            placeholder="Enter Your Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            placeholder="Enter Your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-block btn-primary"
            disabled={!password || !email || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center p-3">
          New to Edemy ?{" "}
          <Link href="/register">
            <a>Register</a>
          </Link>
        </p>
        <p className="text-center ">
          <Link href="/forgot-password">
            <a className="text-danger">Forgot Password ?</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
