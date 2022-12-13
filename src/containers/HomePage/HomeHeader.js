import { useDispatch, useSelector } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils";
import { changeLanguageApp } from "../../store/actions/appActions";
import { useHistory } from "react-router";

const HomeHeader = ({ isShowBanner }) => {
  const language = useSelector((state) => state.app.language);
  const dispatch = useDispatch();
  const history = useHistory();

  const changeLanguage = (languageInput) => {
    dispatch(changeLanguageApp(languageInput));
  };

  const handleClickLogo = () => {
    history.push("/home");
  };
  return (
    <>
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i className="fas fa-bars icon-bars"></i>
            <div className="header-logo" onClick={handleClickLogo}></div>
          </div>
          <div className="c-content">
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="homeheader.speciality" />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id="homeheader.searchdoctor" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>Cơ sở y tế</b>
              </div>
              <div className="sub-title">Chọn bệnh viên phòng khám</div>
            </div>
            <div className="child-content">
              <div>
                <b>Bác sĩ</b>
              </div>
              <div className="sub-title">Chọn bác sĩ giỏi</div>
            </div>
            <div className="child-content">
              <div>
                <b>Gói khám</b>
              </div>
              <div className="sub-title">Khám sức khỏe tổng quát</div>
            </div>
          </div>

          <div className="right-content">
            <div className="support">
              <i className="fas fa-question-circle"></i>
              Hỗ trợ
            </div>
            <div
              className={
                language === LANGUAGES.VI ? "language-vi active" : "language-vi"
              }
            >
              <span onClick={() => changeLanguage(LANGUAGES.VI)}>VN</span>
            </div>
            <div
              className={
                language === LANGUAGES.EN ? "language-en active" : "language-en"
              }
            >
              <span onClick={() => changeLanguage(LANGUAGES.EN)}>EN</span>
            </div>
          </div>
        </div>
      </div>
      {isShowBanner && (
        <div className="home-header-banner">
          <div className="content-up">
            <div className="banner-title">NỀN TẢNG Y TẾ</div>
            <div className="banner-desc">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
            <div className="banner-search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>
          <div className="content-down">
            <div className="banner-options">
              <div className="option-child">
                <div className="icon-child">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">Khám chuyên khoa</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">Khám từ xa</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">Khám tổng quát</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">Xét nghiệm y học</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">Sức khỏe tinh thần</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="text-child">Khám nha khoa</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeHeader;
