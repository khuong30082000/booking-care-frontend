import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MedicalFacility.scss";
import imgSpecialty from "../../../assets/specialty/ckk.jpg";

const HandBook = ({ ...settings }) => {
  return (
    <div className="section-medicalfacility">
      <div className="section-container">
        <div className="specialty-header1">
          <span className="title-header1">Cẩm nang</span>
          <button className="btn-header1">Xem thêm</button>
        </div>
        <div className="specialty-body">
          <Slider {...settings}>
            <div className="specialty-custom">
              <img className="img-custom" src={imgSpecialty} />
              <h3>co suong khop 1</h3>
            </div>
            <div className="specialty-custom">
              <img className="img-custom" src={imgSpecialty} />
              <h3>co suong khop 1</h3>
            </div>
            <div className="specialty-custom">
              <img className="img-custom" src={imgSpecialty} />
              <h3>co suong khop 1</h3>
            </div>
            <div className="specialty-custom">
              <img className="img-custom" src={imgSpecialty} />
              <h3>co suong khop 1</h3>
            </div>
            <div className="specialty-custom">
              <img className="img-custom" src={imgSpecialty} />
              <h3>co suong khop 1</h3>
            </div>
            <div className="specialty-custom">
              <img className="img-custom" src={imgSpecialty} />
              <h3>co suong khop 1</h3>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HandBook;
