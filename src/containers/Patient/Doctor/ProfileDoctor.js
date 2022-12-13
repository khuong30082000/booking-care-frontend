import { getProfileDoctorById } from "../../../services/userService";
import "./ProfileDoctor.scss";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";
import NumericFormat from "react-number-format";
import _ from "lodash";
import moment from "moment";
import { Link } from "react-router-dom";

const ProfileDoctor = ({
  doctorId,
  isShowDescriptionDoctor,
  dataTime,
  isShowLinkDetail,
  isShowPrice,
}) => {
  const [dataProfile, setDataProfile] = useState({});
  const language = useSelector((state) => state.app.language);

  const fetchProfileDoctorById = async (id) => {
    if (id) {
      const res = await getProfileDoctorById(id);
      setDataProfile(res.data);
    }
  };

  useEffect(() => {
    fetchProfileDoctorById(doctorId);
  }, []);
  let nameEn = "";
  let nameVi = "";
  if (dataProfile && dataProfile.positionData) {
    nameVi = `${dataProfile.positionData.valueVi},${dataProfile.firstName} ${dataProfile.lastName}`;
    nameEn = `${dataProfile.positionData.valueEn},${dataProfile.firstName} ${dataProfile.lastName}`;
  }

  const renderTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - DD/MM/YYYY");
      return (
        <div>
          <div>
            {time} {date}{" "}
          </div>
          <div>Miễn phí đặt lịch</div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="intro-doctor">
        <div
          className="content-left"
          style={{
            backgroundImage: `url(${
              dataProfile && dataProfile.image ? dataProfile.image : ""
            })`,
          }}
        ></div>
        <div className="content-right">
          <div className="up">
            {language === LANGUAGES.VI ? nameVi : nameEn}
          </div>
          <div className="down">
            {isShowDescriptionDoctor
              ? dataProfile &&
                dataProfile.Markdown &&
                dataProfile.Markdown.description && (
                  <span>{dataProfile.Markdown.description}</span>
                )
              : renderTimeBooking(dataTime)}
          </div>
        </div>
      </div>
      {isShowLinkDetail && (
        <div className="view-detail-doctor">
          <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
        </div>
      )}

      {isShowPrice && (
        <div className="price">
          Giá khám:{" "}
          {dataProfile &&
          dataProfile.Doctor_Info &&
          language === LANGUAGES.VI ? (
            <NumericFormat
              className="currency"
              displayType="text"
              value={dataProfile.Doctor_Info.priceTypeData.valueVi}
              thousandSeparator={true}
              suffix="VND"
            />
          ) : (
            ""
          )}
          {dataProfile &&
          dataProfile.Doctor_Info &&
          language === LANGUAGES.EN ? (
            <NumericFormat
              className="currency"
              displayType="text"
              value={dataProfile.Doctor_Info.priceTypeData.valueEn}
              thousandSeparator={true}
              suffix="$"
            />
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

export default ProfileDoctor;
