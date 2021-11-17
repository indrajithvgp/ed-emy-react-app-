import { useState, useContext, useEffect } from "react";
import { Context } from "../../context";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { stripeCurrencyFormatter } from "../../utils/helpers";
import {
  DollarOutlined,
  SettingOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
const Revenue = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  // const handlePayoutSettings = () => {};
  useEffect(() => {
    sendBalanceRequest();
  }, []);
  async function sendBalanceRequest() {
    const { data } = await axios.get("/api/instructor/balance");
    setBalance(data);
  }

  const handlePayoutSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/instructor/payout-settings");
      window.location.href = data;
    } catch (err) {
      setLoading(false);
      toast.error("Unable to Process Payment Settings");
    }
  };
  return (
    <InstructorRoute>
      <div className="container">
        <div className="row pt-2">
          <div className="col md-8 offset-md-2 bg-light p-5">
            <h2>
              <DollarOutlined className="float-end" />
            </h2>
            <h2 className="text-center">Revenue Report</h2>
            <p className="mt-5">
              You get paid directly from{" "}
              <span className="fw-bold fst-italic">Stripe</span> to your bank
              account every 48 hour
            </p>
            <hr />
            <h4>
              Pending Balance
              <span className="float-end">
                {balance.pending &&
                  balance.pending.map((bp, i) => {
                    return (
                      <span key={i} className="float-end">
                        {stripeCurrencyFormatter(bp)}
                      </span>
                    );
                  })}
              </span>
            </h4>
            <small>
              for <strong>48</strong> Hours
            </small>
            <hr />
            <h4>
              Payouts{" "}
              {!loading ? (
                <SettingOutlined
                  className="float-end pointer"
                  onClick={handlePayoutSettings}
                />
              ) : (
                <SyncOutlined spin className="float-end pointer" />
              )}
            </h4>
            <small>
              Update your <span className="fw-bold fst-italic">Stripe</span>{" "}
              account details for Previous Payout
            </small>
          </div>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default Revenue;
