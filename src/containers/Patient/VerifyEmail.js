import { useState } from "react";
import { useEffect } from "react";
import { postVerifyBookAppointment } from "../../services/userService";
import HomeHeader from "../HomePage/HomeHeader";

const VerifyEmail = ({ location }) => {
  const [statusVerify, setStatusVerify] = useState(false);
  const [errCodeState, setErrCodeState] = useState(0);

  const fetchVerifyBookAppointment = async () => {
    if (location && location.search) {
      const urlParams = new URLSearchParams(location.search);
      const token = urlParams.get("token");
      const doctorId = urlParams.get("doctorId");
      const res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        setStatusVerify(true);
        setErrCodeState(res.errCode);
      } else {
        setStatusVerify(true);
        setErrCodeState(res && res.errCode ? res.errCode : -1);
      }
    }
  };

  useEffect(() => {
    fetchVerifyBookAppointment();
  }, []);
  return (
    <>
      <HomeHeader />
      {statusVerify === false ? (
        <div>Loading data...</div>
      ) : (
        <div>
          {+errCodeState === 0 ? (
            <div>Xác nhận lịch hẹn thành công</div>
          ) : (
            <div>Lịch hẹn không tồn tại hoặc đã xác nhận</div>
          )}
        </div>
      )}
    </>
  );
};

export default VerifyEmail;
