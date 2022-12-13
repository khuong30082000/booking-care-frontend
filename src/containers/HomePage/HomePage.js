import HomeHeader from "./HomeHeader";
import MedicalFacility from "./Section/MedicalFacility";
import Specialty from "./Section/Specialty";
import "./HomePage.scss";
import OutStangdingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/Handbook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

const HomePage = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div>
      <HomeHeader isShowBanner />
      <Specialty {...settings} />
      <MedicalFacility {...settings} />
      <OutStangdingDoctor {...settings} />
      <HandBook {...settings} />
      <About />
      <HomeFooter />
      <div style={{ height: "300px" }}></div>
    </div>
  );
};

export default HomePage;
