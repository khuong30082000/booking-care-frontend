import "./Specialty.scss";
import { FormattedMessage } from "react-intl";
// Import css files
import "./About.scss";
const About = () => {
  return (
    <div className="section-about">
      <div className="section-about-header">Truyền thông nói gì về NTK</div>
      <div className="section-about-content">
        <div className="content-left">
          <iframe
            width="100%"
            height="400px"
            src="https://www.youtube.com/embed/hjvRIpU6acQ"
            title="KEYO - TÒNG PHU | Official Music Video | Quá khó để chăm lo một người con gái..."
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="content-right">
          <p>
            Trong video này, chúng ta sẽ hoàn tất việc design giao diện theo
            trang bookingcare.vn. Chúng ta sẽ hoàn thiện những phần đang còn
            dang dở, để từ video tiếp theo, chúng ta sẽ bắt đầu làm về backend
            và react để tạo dữ liệu thật cho trang home design này.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
