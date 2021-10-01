import { useState , useEffect, useContext} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Register = () => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.user !== null) router.push("/");
  }, [state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`api/register`, {
        name,
        email,
        password,
      });
      setLoading(false);
      toast.success("Registraion Successful. Please Login ");

      console.log(data);
    } catch (err) {
      setLoading(false);
      console.log(err);
      toast.error(err.response.data);
    }
  };

  return (
    <>
      <h1 className="jumbotron  bg-primary text-center square p-4">Register</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            placeholder="Enter Your Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
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
            disabled={!name || !password || !email || loading}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
        <p className="text-center p-3">
          Already Registered ?{" "}
          <Link href="/login">
            <a>Login</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
