import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MedicalFacility.scss";
import imgOutStandingDortor from "../../../assets/images/b.jpg";
import "./OutStangdingDoctor.scss";
import * as actions from "../../../store/actions";
import { useEffect } from "react";
import { fetchTopDoctorAsync } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { LANGUAGES } from "../../../utils";
import { useHistory } from "react-router";
import { path } from "../../../utils";

const OutStangdingDoctor = ({ ...settings }) => {
  const dispatch = useDispatch();
  const dataTopDoctors = useSelector((state) => state.home.dataTopDoctors);
  const language = useSelector((state) => state.app.language);
  // console.log(dataTopDoctors);
  const [arrTopDoctors, setArrTopDoctors] = useState([]);

  const history = useHistory();

  useEffect(() => {
    setArrTopDoctors(dataTopDoctors);
  }, [dataTopDoctors]);

  useEffect(() => {
    dispatch(fetchTopDoctorAsync());
  }, [dispatch]);

  const handleDetailDoctor = (doctor) => {
    history.push(`${path.DETAIL_DOCTOR}/${doctor.id}`);
  };

  return (
    <div className="section-specialty">
      <div className="section-container">
        <div className="specialty-header1">
          <span className="title-header1">Bác sĩ nổi bật tuần qua</span>
          <button className="btn-header1">Xem thêm</button>
        </div>
        <div className="specialty-body">
          <Slider {...settings}>
            {arrTopDoctors &&
              arrTopDoctors.length > 0 &&
              arrTopDoctors.map((item, idx) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = new Buffer(item.image, "base64").toString(
                    "binary"
                  );
                }
                let nameVi = `${item.positionData.valueVi},${item.firstName} ${item.lastName}`;
                let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                return (
                  <div
                    className="specialty-custom a"
                    key={idx}
                    onClick={() => handleDetailDoctor(item)}
                  >
                    <div className="custom-border">
                      <div className="outer-bg">
                        <img
                          className="img-custom section-outstanding-doctor"
                          src={imageBase64}
                        />
                      </div>

                      <div className="position text-center">
                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div>co suong khop 1</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default OutStangdingDoctor;
