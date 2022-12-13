import "./ManagePatient.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctorsAsync,
  fetchAllSheduleAsync,
} from "../../../store/actions";

import { useEffect, useState } from "react";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import ModalRemedy from "./ModalRemedy";
import { toast } from "react-toastify";

const ManagePatient = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const language = useSelector((state) => state.app.language);
  const [currentDate, setCurrentDate] = useState(
    moment(new Date()).startOf("day").valueOf()
  );
  const [dataPatient, setDataPatient] = useState([]);
  const [isOpenRemedyModal, setIsOpenRemedyModal] = useState(false);
  const [dataModal, setDataModal] = useState({});

  const handleOnChangeDatePicker = async (date) => {
    setCurrentDate(date[0]);
  };

  const fetchAllPatientForDoctor = async () => {
    let formatedDate = new Date(currentDate).getTime();
    let res = await getAllPatientForDoctor({
      doctorId: userInfo.id,
      date: formatedDate,
    });

    if (res && res.errCode === 0) {
      setDataPatient(res.data);
    }
  };

  useEffect(() => {
    fetchAllPatientForDoctor();
  }, []);

  useEffect(() => {
    fetchAllPatientForDoctor();
  }, [currentDate]);

  const handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
    };
    setIsOpenRemedyModal(true);
    setDataModal(data);
  };

  const closeRemedyModal = () => {
    setIsOpenRemedyModal(false);
  };

  const sendRemedy = async (dataFromChild) => {
    let res = await postSendRemedy({
      ...dataFromChild,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: language,
    });

    if (res && res.errCode === 0) {
      toast.success("Send Remedy succeeds");
      closeRemedyModal();
      await fetchAllPatientForDoctor();
    } else {
      toast.error("Something wrong");
    }
  };

  return (
    <>
      <div className="manage-patient-container">
        <div className="m-p-title">quản lý bệnh nhân khám bênh</div>
        <div className="manage-patient-body row">
          <div className="col-4 form-group">
            <label>Chọn ngày khám</label>
            <DatePicker
              className="form-control"
              onChange={handleOnChangeDatePicker}
              value={currentDate}
            />
          </div>
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Thời gian</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Gioi tinh</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {dataPatient && dataPatient.length > 0 ? (
                  dataPatient.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <th scope="row">{idx + 1}</th>
                        <td>{item.timeTypeDataPatient.valueVi}</td>
                        <td>{item.patientData.firstName}</td>
                        <td>{item.patientData.address}</td>
                        <td>{item.patientData.genderData.valueVi}</td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleBtnConfirm(item)}
                          >
                            Xác nhận
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <th scope="row">nodata</th>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalRemedy
        isOpenModal={isOpenRemedyModal}
        dataModal={dataModal}
        closeModal={closeRemedyModal}
        sendRemedy={sendRemedy}
      />
    </>
  );
};

export default ManagePatient;
