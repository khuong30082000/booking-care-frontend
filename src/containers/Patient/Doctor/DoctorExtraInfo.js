import "./DoctorExtraInfo.scss";
import { useEffect, useState } from "react";
import { getExtraInfoDoctorById } from "../../../services/userService";
import NumericFormat from "react-number-format";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";

const DoctorExtraInfo = ({ doctorId }) => {
  const [isShowDetailInfo, setIsShowDetailInfo] = useState(false);
  const [extraDoctorInfo, setExtraDoctorInfo] = useState({});
  const language = useSelector((state) => state.app.language);

  const fetchExtraInfoDoctorById = async (doctorId) => {
    let res = await getExtraInfoDoctorById(doctorId);
    if (res && res.errCode === 0) {
      setExtraDoctorInfo(res.data ? res.data : []);
    }
  };
  useEffect(() => {
    fetchExtraInfoDoctorById(doctorId);
  }, []);

  return (
    <div className="doctor-extra-info-container">
      <div className="content-up">
        <div className="text-address">ĐỊA CHỈ KHÁM</div>
        <div className="name-clinic">
          {extraDoctorInfo && extraDoctorInfo.nameClinic
            ? extraDoctorInfo.nameClinic
            : ""}
        </div>
        <div className="detail-address">
          {" "}
          {extraDoctorInfo && extraDoctorInfo.addressClinic
            ? extraDoctorInfo.addressClinic
            : ""}
        </div>
      </div>
      <div className="content-down">
        {isShowDetailInfo === false && (
          <div className="short-info">
            GIÁ KHÁM:{" "}
            {extraDoctorInfo &&
              extraDoctorInfo.priceTypeData &&
              language === LANGUAGES.VI && (
                <NumericFormat
                  className="currency"
                  displayType="text"
                  value={extraDoctorInfo.priceTypeData.valueVi}
                  thousandSeparator={true}
                  suffix="VND"
                />
              )}
            {extraDoctorInfo &&
              extraDoctorInfo.priceTypeData &&
              language === LANGUAGES.EN && (
                <NumericFormat
                  className="currency"
                  displayType="text"
                  value={extraDoctorInfo.priceTypeData.valueEn}
                  thousandSeparator={true}
                  suffix="$"
                />
              )}
            <span className="detail" onClick={() => setIsShowDetailInfo(true)}>
              {" "}
              Xem chi tiết
            </span>
          </div>
        )}
        {isShowDetailInfo && (
          <>
            <div className="title-price">GIÁ KHÁM:</div>
            <div className="detail-info">
              <div className="price">
                <span className="left">Gía khám </span>
                <span className="right">
                  {" "}
                  {extraDoctorInfo &&
                    extraDoctorInfo.priceTypeData &&
                    language === LANGUAGES.VI && (
                      <NumericFormat
                        className="currency"
                        displayType="text"
                        value={extraDoctorInfo.priceTypeData.valueVi}
                        thousandSeparator={true}
                        suffix="VND"
                      />
                    )}
                  {extraDoctorInfo &&
                    extraDoctorInfo.priceTypeData &&
                    language === LANGUAGES.EN && (
                      <NumericFormat
                        className="currency"
                        displayType="text"
                        value={extraDoctorInfo.priceTypeData.valueEn}
                        thousandSeparator={true}
                        suffix="$"
                      />
                    )}
                </span>
              </div>
              <div className="note">
                {extraDoctorInfo && extraDoctorInfo.note
                  ? extraDoctorInfo.note
                  : ""}
              </div>
            </div>

            <div className="payment">
              Người bệnh thanh toán bằng:
              {extraDoctorInfo &&
              extraDoctorInfo.paymentTypeData &&
              language === LANGUAGES.VI
                ? extraDoctorInfo.paymentTypeData.valueVi
                : ""}
              {extraDoctorInfo &&
              extraDoctorInfo.paymentTypeData &&
              language === LANGUAGES.EN
                ? extraDoctorInfo.paymentTypeData.valueEn
                : ""}
            </div>

            <div className="hide-price">
              <span onClick={() => setIsShowDetailInfo(false)}>
                {" "}
                Ẩn bảng giá
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DoctorExtraInfo;
