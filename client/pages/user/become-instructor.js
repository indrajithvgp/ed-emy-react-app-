import axios from "axios";
import { useContext, useState, useEffect } from "react";

import { Context } from "../../context";
import { Button } from "antd";
import {
  SettingOutlined,
  UserSwitchOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";

import UserRoute from "../../components/routes/UserRoute";

const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false);
  const {
    state: { user },
  } = useContext(Context);
  const becomeInstructor = async () => {
    setLoading(true);
    axios
      .post("/api/make-instructor")
      .then((res) => {
        window.location.href = res.data;
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Stripe onboarding failed. Try again");
        setLoading(false);
      });
  };
  return (
    <>
      <h1 className="jumbotron text-center square">Create Course</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 text-center">
            <UserSwitchOutlined className="display-1 pb-3" />
            <div className="pt-4">
              <br />
              <h2>Setup payout to publish courses on Ed-emy</h2>
              <p className="lead text-warning">
                Ed-emy partners with stripe to transfer earnings to your bank
                account
              </p>
              <Button
                className="mb-3"
                type="primary"
                block
                shape="round"
                size="large"
                onClick={becomeInstructor}
                disabled={
                  (user && user.role && !user.role.includes("Instructor")) ||
                  loading
                }
                icon={loading ? <LoadingOutlined /> : <SettingOutlined />}
              >
                {loading ? "Processing .." : "Payout Setup"}
              </Button>

              <p className="lead">
                You will be redirected to stripe to complete the onboarding process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BecomeInstructor;
