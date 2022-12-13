import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MedicalFacility.scss";
import imgSpecialty from "../../../assets/specialty/ckk.jpg";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { path } from "../../../utils";
import { getAllClinic } from "../../../services/userService";

const MedicalFacility = ({ ...settings }) => {
  const [arrayClinic, setArrClinic] = useState([]);
  const history = useHistory();

  const fetchAllClinic = async () => {
    let res = await getAllClinic();

    if (res && res.errCode === 0) {
      setArrClinic(res.data ? res.data : []);
    }
  };

  useEffect(() => {
    fetchAllClinic();
  }, []);

  const handleClickClinic = (item) => {
    history.push(`${path.DETAIL_CLINIC}/${item.id}`);
  };

  return (
    <div className="section-medicalfacility">
      <div className="section-container">
        <div className="specialty-header1">
          <span className="title-header1">Cơ xở y tế nổi bật</span>
          <button className="btn-header1">Xem thêm</button>
        </div>
        <div className="specialty-body">
          <Slider {...settings}>
            {arrayClinic &&
              arrayClinic.length > 0 &&
              arrayClinic.map((item, idx) => {
                return (
                  <div
                    className="specialty-custom"
                    key={idx}
                    onClick={() => handleClickClinic(item)}
                  >
                    <img className="img-custom" src={item.image} />
                    <h3>{item.name}</h3>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MedicalFacility;
