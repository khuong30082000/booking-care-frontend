import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getDetailInfoDoctor } from "../../../services/userService";
import HomeHeader from "../../HomePage/HomeHeader";
import { useSelector } from "react-redux";
import "./DetailDoctor.scss";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

const DetailDoctor = (props) => {
  // const { id } = useParams(); // cach 2
  const language = useSelector((state) => state.app.language);
  const [detailDoctor, setDetailDoctor] = useState({});
  const currentDoctorId = props.match.params.id;

  const getDetailInfoDoctorService = async (id) => {
    const res = await getDetailInfoDoctor(id);

    if (res && res.errCode === 0) {
      setDetailDoctor(res.data);
    }
  };
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      getDetailInfoDoctorService(props.match.params.id);
    }
  }, []); // cach 2 lay params
  let nameEn = "";
  let nameVi = "";
  if (detailDoctor && detailDoctor.positionData) {
    nameVi = `${detailDoctor.positionData.valueVi},${detailDoctor.firstName} ${detailDoctor.lastName}`;
    nameEn = `${detailDoctor.positionData.valueEn},${detailDoctor.firstName} ${detailDoctor.lastName}`;
  }

  return (
    <>
      <HomeHeader />
      <div className="detail-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{ backgroundImage: `url(${detailDoctor.image})` }}
          ></div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
            </div>

            <iframe
              src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=120&layout=button&action=like&size=small&share=true&height=65&appId"
              width={120}
              height={65}
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder={0}
              allowFullScreen="true"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
        <div className="schedule-doctor">
          <div className="content-left">
            <DoctorSchedule doctorId={currentDoctorId} />
          </div>
          <div className="content-right">
            <DoctorExtraInfo doctorId={currentDoctorId} />
          </div>
        </div>
        <div className="detail-info-doctor">
          {detailDoctor &&
            detailDoctor.Markdown &&
            detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
        </div>
        <div className="comment-doctor"></div>
      </div>
    </>
  );
};

export default DetailDoctor;
