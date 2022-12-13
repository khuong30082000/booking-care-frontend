import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import { useEffect, useState } from "react";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { fetchGenderAsync } from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import { FormattedMessage } from "react-intl";
import { postPatientBook } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";

const BookingModal = ({ isOpenModal, closeBookingModal, dataTime }) => {
  const genders = useSelector((state) => state.admin.genders);
  const language = useSelector((state) => state.app.language);
  const dispatch = useDispatch();

  const defaultValue = {
    fullname: "",
    phonenumber: "",
    email: "",
    address: "",
    reason: "",
    birthday: "",
    selectedGender: "",
    genders: "",
    doctorId: "",
    timeType: "",
  };

  const [state, setState] = useState(defaultValue);

  useEffect(() => {
    dispatch(fetchGenderAsync());
  }, [dispatch]);

  const buildDataGender = (data) => {
    let result = [];
    if (data && data.length > 0) {
      data.map((item) => {
        let obj = {};
        obj.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        obj.value = item.keyMap;
        result.push(obj);
      });
    }
    return result;
  };

  useEffect(() => {
    setState({ ...state, genders: buildDataGender(genders) });
    if (dataTime && !_.isEmpty(dataTime)) {
      let doctorId = dataTime.doctorId;
      let timeType = dataTime.timeType;
      setState({ ...state, doctorId: doctorId, timeType: timeType });
    }
  }, [genders, language, dataTime]);

  const handleOnChangeInput = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...state };
    stateCopy[id] = valueInput;
    setState({
      ...stateCopy,
    });
  };

  const handleOnChangeDatePicker = (date) => {
    setState({
      ...state,
      birthday: date[0],
    });
  };

  const handleChangeSelect = (selectedOption) => {
    setState({ ...state, selectedGender: selectedOption });
  };

  const buildTimeBooking = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return `${time} - ${date}`;
    }
    return "";
  };

  const buildDoctorName = (dataTime) => {
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };

  const handleConfirmBooking = async () => {
    let date = new Date(state.birthday).getTime();
    let timeString = buildTimeBooking(dataTime);
    let doctorName = buildDoctorName(dataTime);
    let res = await postPatientBook({
      fullname: state.fullname,
      phonenumber: state.phonenumber,
      email: state.email,
      address: state.address,
      reason: state.reason,
      date: dataTime.date,
      birthday: date,
      selectedGender: state.selectedGender.value,
      doctorId: state.doctorId,
      timeType: state.timeType,
      language: language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Booking a new succeed");
      closeBookingModal();
    } else {
      toast.error("Booking Error!");
    }
  };

  return (
    <Modal
      isOpen={isOpenModal}
      className="booking-modal-container"
      centered
      backdrop={true}
      size="lg"
    >
      <ModalHeader toggle={closeBookingModal}>
        <b> Thông tin đặt lịch khám bệnh</b>
      </ModalHeader>
      <ModalBody>
        <div className="doctor-info">
          <ProfileDoctor
            dataTime={dataTime}
            isShowDescriptionDoctor={false}
            doctorId={state.doctorId}
            isShowPrice
          />
        </div>

        <div className="row">
          <div className="col-6 form-group">
            <label>Họ tên</label>
            <input
              className="form-control"
              value={state.fullname}
              onChange={(e) => handleOnChangeInput(e, "fullname")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Số điện thoại</label>
            <input
              className="form-control"
              value={state.phonenumber}
              onChange={(e) => handleOnChangeInput(e, "phonenumber")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Địa chỉ Email</label>
            <input
              className="form-control"
              value={state.email}
              onChange={(e) => handleOnChangeInput(e, "email")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Địa chỉ liên hệ</label>
            <input
              className="form-control"
              value={state.address}
              onChange={(e) => handleOnChangeInput(e, "address")}
            />
          </div>
          <div className="col-12 form-group">
            <label>Lý do khám</label>
            <input
              className="form-control"
              value={state.reason}
              onChange={(e) => handleOnChangeInput(e, "reason")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ngày sinh</label>
            <DatePicker
              className="form-control"
              onChange={handleOnChangeDatePicker}
              value={state.birthday}
            />
          </div>
          <div className="col-6 form-group">
            <label>Giới tính</label>
            <Select
              value={state.selectedGender}
              onChange={handleChangeSelect}
              options={state.genders}
              placeholder="Chọn giới tính"
            />
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => handleConfirmBooking()}>
          Save
        </Button>{" "}
        <Button color="secondary" onClick={() => closeBookingModal()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BookingModal;
