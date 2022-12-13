import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect } from "react";
import { useState } from "react";
import { getAllSpecialty } from "../../../services/userService";
import { useHistory } from "react-router";
import { path } from "../../../utils";

const Specialty = ({ ...settings }) => {
  const [arraySpecialty, setArrSpecialty] = useState([]);
  const history = useHistory();

  const fetchAllSpecialty = async () => {
    let res = await getAllSpecialty();

    if (res && res.errCode === 0) {
      setArrSpecialty(res.data ? res.data : []);
    }
  };

  useEffect(() => {
    fetchAllSpecialty();
  }, []);

  const handleClickSpecialty = (item) => {
    history.push(`${path.DETAIL_SPECIALTY}/${item.id}`);
  };

  return (
    <div className="section-specialty">
      <div className="section-container">
        <div className="specialty-header1">
          <span className="title-header1">Chuyên khoa phổ biến</span>
          <button className="btn-header1">Xem thêm</button>
        </div>
        <div className="specialty-body">
          <Slider {...settings}>
            {arraySpecialty &&
              arraySpecialty.length > 0 &&
              arraySpecialty.map((item, idx) => {
                return (
                  <div
                    className="specialty-custom"
                    key={idx}
                    onClick={() => handleClickSpecialty(item)}
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

export default Specialty;
