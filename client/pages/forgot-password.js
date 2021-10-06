import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const Forgot = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setLoading(false);
      setSuccess(true);
      toast("Check your Email to get the password");
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
      toast(err.response.data);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/reset-password", { email, code, newPassword });
      setLoading(false);
      setSuccess(true);
      setEmail('')
      setCode('')
      setNewPassword('')
      toast("Great.! You can Login with your new Password");
      router.push("/login")
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
      toast(err.response.data);
    }
  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square p-2">
        Forgot Password
      </h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={success ? handleResetPassword : handleSubmit}>
          <input
            type="email"
            className="form-control mt-4 mb-2 p-4"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {success && (
            <>
              <input
                type="text"
                className="form-control mt-4 mb-2 p-4"
                placeholder="Enter Secret Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mt-4 mb-2 p-4"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </>
          )}
          <br />
          <button
            type="submit"
            className="btn btn-primary btn-block p-1"
            disabled={loading || !email}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Forgot;
