import { useEffect, useState } from "react";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllDetailSpecialtyById,
  getAllCode,
} from "../../../services/userService";
import _ from "lodash";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";

const DetailSpecialty = (props) => {
  const language = useSelector((state) => state.app.language);

  const [arrDoctorId, setArrDoctorId] = useState([]);
  const [dataDetailSpecialty, setDataDetailSpecialty] = useState({});
  const [listProvince, setListProvince] = useState([]);

  const fetchAllDetailSpecialtyById = async () => {
    if (props.match && props.match.params && props.match.params.id) {
      let id = props.match.params.id;
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: "ALL",
      });

      let resProvince = await getAllCode("PROVINCE");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;

        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn Quốc",
          });
        }

        setDataDetailSpecialty(res.data);
        setArrDoctorId(arrDoctorId);
        setListProvince(dataProvince ? dataProvince : []);
      }
    }
  };

  useEffect(() => {
    fetchAllDetailSpecialtyById();
  }, []);

  const handleOnChangeSelect = async (e) => {
    if (props.match && props.match.params && props.match.params.id) {
      let id = props.match.params.id;
      let location = e.target.value;
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        setDataDetailSpecialty(res.data);
        setArrDoctorId(arrDoctorId);
      }
    }
  };

  return (
    <div className="detail-specialty-container">
      <HomeHeader />
      <div className="detail-specialty-body">
        <div className="description-specialty">
          {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
            <div
              dangerouslySetInnerHTML={{
                __html: dataDetailSpecialty.descriptionHTML,
              }}
            ></div>
          )}
        </div>
        <div className="search-sp-doctor">
          <select onChange={(e) => handleOnChangeSelect(e)}>
            {listProvince &&
              listProvince.length > 0 &&
              listProvince.map((item, idx) => {
                return (
                  <option key={idx} value={item.keyMap}>
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </option>
                );
              })}
          </select>
        </div>

        {arrDoctorId &&
          arrDoctorId.length > 0 &&
          arrDoctorId.map((item, idx) => {
            return (
              <div className="each-doctor" key={idx}>
                <div className="dt-content-left">
                  <ProfileDoctor
                    doctorId={item}
                    isShowDescriptionDoctor={true}
                    isShowLinkDetail={true}
                  />
                </div>
                <div className="dt-content-right">
                  <div className="doctor-schedule">
                    <DoctorSchedule doctorId={item} />
                  </div>
                  <div className="doctor-extra-info">
                    <DoctorExtraInfo doctorId={item} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DetailSpecialty;
