import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctorsAsync,
  fetchAllSheduleAsync,
} from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils";
import { useEffect, useState } from "react";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";

const ManageSchedule = () => {
  const dispatch = useDispatch();
  const allDoctors = useSelector((state) => state.home.allDoctors);
  const language = useSelector((state) => state.app.language);
  const scheduleTime = useSelector((state) => state.admin.scheduleTime);

  const [listDoctors, setListDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [rangeTime, setRangeTime] = useState([]);

  const builtDataSelect = (arrData) => {
    const result = [];
    if (arrData && arrData.length > 0) {
      arrData.map((item, idx) => {
        let obj = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };

  useEffect(() => {
    dispatch(fetchAllDoctorsAsync());
    dispatch(fetchAllSheduleAsync());
  }, [dispatch]);

  useEffect(() => {
    const optionsDoctor = builtDataSelect(allDoctors);
    setListDoctors(optionsDoctor);
    let data = scheduleTime;
    if (data && data.length > 0) {
      data.map((item) => {
        item.isSelected = false;
        return item;
      });
    }
    setRangeTime(data);
  }, [allDoctors, language, scheduleTime]);

  const handleChangeSelect = (selectedDoctor) => {
    setSelectedDoctor(selectedDoctor);
  };

  const handleOnChangeDatePicker = (date) => {
    setCurrentDate(date[0]);
  };

  const handleClickBtnTime = (itemBtn) => {
    let rangeTimeNew = "";
    if (rangeTime && rangeTime.length > 0) {
      rangeTimeNew = rangeTime.map((item) => {
        if (item.id === itemBtn.id) item.isSelected = !item.isSelected;
        return item;
      });

      setRangeTime(rangeTimeNew);
    }
  };

  const handleSaveSchedule = async () => {
    let result = [];
    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected Doctor");
      return;
    }
    // let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let obj = {};
          obj.doctorId = selectedDoctor.value;
          obj.date = formatedDate;
          obj.timeType = item.keyMap;
          result.push(obj);
        });
      } else {
        toast.error("Invalid Selected Time !");
      }
    }
    const resp = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    });
    if (resp && resp.errCode === 0) {
      toast.success("Save info success");
    } else {
      toast.error("Error saveBulk");
    }
  };

  let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  return (
    <div className="manage-schedule-container">
      <div className="m-s-title">
        <FormattedMessage id="manage-schedule.title" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6 form-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={selectedDoctor}
              onChange={handleChangeSelect}
              options={listDoctors}
            />
          </div>
          <div className="col-6">
            <label>Chọn bác sĩ</label>
            <DatePicker
              className="form-control"
              onChange={handleOnChangeDatePicker}
              value={currentDate}
              minDate={yesterday}
            />
          </div>
          <div className="col-12 pick-hour-container">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((item, idx) => {
                return (
                  <button
                    className={
                      item.isSelected === true
                        ? "btn btn-schedule active"
                        : "btn btn-schedule"
                    }
                    key={idx}
                    onClick={() => handleClickBtnTime(item)}
                  >
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </button>
                );
              })}
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary btn-save"
              onClick={handleSaveSchedule}
            >
              lưu thông tin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSchedule;
