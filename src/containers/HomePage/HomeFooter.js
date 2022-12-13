import { FormattedMessage } from "react-intl";
// Import css files
import "./HomeFooter.scss";

const HomeFooter = () => {
  return (
    <div className="home-footer">
      <p>
        &copy; 2022 Nguyễn Trọng Khương{" "}
        <a
          target="_blank"
          href="https://project-portfolio-khuong30082000.vercel.app/?fbclid=IwAR2qOeY-Dm0I_cp-Gu1878S1w7QMJFVRnM2AgZ1cPB0jZ499QObeYoInOcE"
        >
          project-portfolio-khuong30082000.vercel.app
        </a>
      </p>
    </div>
  );
};

export default HomeFooter;
