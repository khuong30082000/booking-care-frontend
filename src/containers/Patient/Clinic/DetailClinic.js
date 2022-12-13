import { useEffect, useState } from "react";
import HomeHeader from "../../HomePage/HomeHeader";
import "./DetailClinic.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getAllCode,
  getAllDetailClinicById,
} from "../../../services/userService";
import _ from "lodash";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";

const DetailClinic = (props) => {
  const language = useSelector((state) => state.app.language);

  const [arrDoctorId, setArrDoctorId] = useState([]);
  const [dataDetailClinic, setDataDetailClinic] = useState({});

  const fetchAllDetailSpecialtyById = async () => {
    if (props.match && props.match.params && props.match.params.id) {
      let id = props.match.params.id;
      let res = await getAllDetailClinicById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        setDataDetailClinic(res.data);
        setArrDoctorId(arrDoctorId);
      }
    }
  };

  useEffect(() => {
    fetchAllDetailSpecialtyById();
  }, []);

  return (
    <div className="detail-specialty-container">
      <HomeHeader />
      <div className="detail-specialty-body">
        <div className="description-specialty">
          {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
            <>
              <div>{dataDetailClinic.name}</div>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailClinic.descriptionHTML,
                }}
              ></div>
            </>
          )}
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

export default DetailClinic;
