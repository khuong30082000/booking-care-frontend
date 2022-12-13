import Select from "react-select";
import moment from "moment";
import { useState } from "react";
import localization from "moment/locale/vi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { getScheduleDoctorByDate } from "../../../services/userService";
import "./DoctorSchedule.scss";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

const DoctorSchedule = ({ doctorId }) => {
  const [allDays, setAllDays] = useState([]);
  const language = useSelector((state) => state.app.language);
  const [allAvalableTime, setAllAvalableTime] = useState([]);
  const [isOpenModalBooking, setIsOpenModalBooking] = useState(false);
  const [dataScheduleTimeModal, setDataScheduleTimeModal] = useState({});

  const fetchScheduleDoctorByDate = async (doctorId, date) => {
    let res = await getScheduleDoctorByDate(doctorId, date);
    if (res && res.errCode === 0) {
      setAllAvalableTime(res.data ? res.data : []);
    }
  };
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getAllDays = () => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM"); //24/-7
          let today = `Hôm nay - ${ddMM}`;
          obj.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          obj.label = capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM"); //24/-7
          let today = `Today - ${ddMM}`;
          obj.label = today;
        } else {
          obj.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }

      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      arrDate.push(obj);
    }
    return arrDate;
  };

  useEffect(() => {
    let allDays = getAllDays();
    fetchScheduleDoctorByDate(doctorId, allDays[0].value);
    setAllDays(allDays);
  }, [language]);

  const handleOnChangeSelect = (e) => {
    // let doctorId = props.match.params.id;
    if (doctorId && doctorId !== -1) {
      let date = e.target.value;
      fetchScheduleDoctorByDate(doctorId, date);
    }
  };

  const handleClickScheduleTime = (time) => {
    setIsOpenModalBooking(true);
    setDataScheduleTimeModal(time);
  };

  const closeBookingModal = () => {
    setIsOpenModalBooking(false);
  };

  return (
    <>
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select onChange={(e) => handleOnChangeSelect(e)}>
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, idx) => {
                return (
                  <option value={item.value} key={idx}>
                    {item.label}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calendar">
            <i className="fas fa-calendar-alt">
              <span>
                <FormattedMessage id="patient.detail-doctor.schedule" />
              </span>
            </i>
          </div>
          <div className="time-content">
            {allAvalableTime && allAvalableTime.length > 0 ? (
              <>
                <div className="time-content-btns">
                  {allAvalableTime.map((item, idx) => {
                    let timeDisplay =
                      language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleClickScheduleTime(item)}
                      >
                        {timeDisplay}
                      </button>
                    );
                  })}
                </div>

                <div className="book-free">
                  <span>
                    <FormattedMessage id="patient.detail-doctor.choose" />
                    <i className="far fa-hand-point-up"></i>
                    <FormattedMessage id="patient.detail-doctor.book-free" />
                  </span>
                </div>
              </>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>
      </div>
      <BookingModal
        isOpenModal={isOpenModalBooking}
        closeBookingModal={closeBookingModal}
        dataTime={dataScheduleTimeModal}
      />
    </>
  );
};

export default DoctorSchedule;
