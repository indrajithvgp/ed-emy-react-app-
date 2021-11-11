import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { Context } from "../../context";
import UserNav from "../nav/UserNav";

const StudentRoute = ({ children, showNav = true }) => {
  const router = useRouter();
  const [ok, setOk] = useState(false);
  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // console.log("user", user);
        const { data } = await axios.get("/api/current-user");
        if (data.ok) setOk(true);
      } catch (err) {
        setOk(false);
        router.push("/login");
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      {!ok ? (
        <SyncOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      ) : (
        <div className="container-fluid">
          {children}
        </div>
      )}
    </>
  );
};

export default StudentRoute;
