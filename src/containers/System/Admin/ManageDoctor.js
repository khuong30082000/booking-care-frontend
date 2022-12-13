import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDoctorsAsync,
  fetchDoctorInfoAsync,
  saveDetailDoctorAsync,
} from "../../../store/actions";
import "../UserManage.scss";
import { useState } from "react";
import Swal from "sweetalert2";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";

import "react-markdown-editor-lite/lib/index.css";
import "./ManageDoctor.scss";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { push } from "connected-react-router";
import { getDetailInfoDoctor } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

const ManageDoctor = () => {
  //redux
  const allDoctors = useSelector((state) => state.home.allDoctors);
  const language = useSelector((state) => state.app.language);
  const allRequiredDoctorInfo = useSelector(
    (state) => state.admin.allRequiredDoctorInfo
  );
  //dispatch
  const dispatch = useDispatch();

  const defaultState = {
    contentMarkdown: "",
    contentHTML: "",
    descTextArea: "",
    hasOldData: false,

    listDoctors: [],
    listPrice: [],
    listPayment: [],
    listProvince: [],
    listClinic: [],
    listSpecialty: [],

    selectedPrice: "",
    selectedPayment: "",
    selectedProvince: "",
    selectedClinic: "",
    selectedSpecialty: "",

    nameClinic: "",
    addressClinic: "",
    note: "",
    clinicId: "",
    specialtyId: "",
  };

  //state
  const [state, setState] = useState(defaultState);

  const [selectDoctor, setSelectDoctor] = useState(null);

  const builtDataSelect = (arrData, type) => {
    const result = [];
    if (arrData && arrData.length > 0) {
      if (type === "USERS") {
        arrData.map((item, idx) => {
          let obj = {};
          let labelVi = `${item.lastName} ${item.firstName}`;

          let labelEn = `${item.firstName} ${item.lastName}`;

          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.id;
          result.push(obj);
        });
      }
      if (type === "PRICE") {
        arrData.map((item, idx) => {
          let obj = {};
          let labelVi = `${item.valueVi}`;

          let labelEn = `${item.valueEn} USD`;

          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        arrData.map((item, idx) => {
          let obj = {};
          let labelVi = `${item.valueVi}`;

          let labelEn = `${item.valueEn}`;

          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
      if (type === "SPECIALTY") {
        arrData.map((item, idx) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
      if (type === "CLINIC") {
        arrData.map((item, idx) => {
          let obj = {};
          obj.label = item.name;
          obj.value = item.id;
          result.push(obj);
        });
      }
    }
    return result;
  };

  function handleEditorChange({ html, text }) {
    setState({
      ...state,
      contentMarkdown: text,
      contentHTML: html,
    });
  }

  useEffect(() => {
    dispatch(fetchAllDoctorsAsync());
    dispatch(fetchDoctorInfoAsync());
  }, [dispatch]);

  useEffect(() => {
    const dataSelectDoctor = builtDataSelect(allDoctors, "USERS");

    const dataSelectPrice = builtDataSelect(
      allRequiredDoctorInfo.resPrice,
      "PRICE"
    );
    const dataSelectPayment = builtDataSelect(
      allRequiredDoctorInfo.resPayment,
      "PAYMENT"
    );
    const dataSelectProvince = builtDataSelect(
      allRequiredDoctorInfo.resProvince,
      "PROVINCE"
    );

    const dataSelectSpecialty = builtDataSelect(
      allRequiredDoctorInfo.resSpecialty,
      "SPECIALTY"
    );
    const dataSelectClinic = builtDataSelect(
      allRequiredDoctorInfo.resClinic,
      "CLINIC"
    );

    setState({
      ...state,
      listDoctors: dataSelectDoctor,
      listPrice: dataSelectPrice,
      listPayment: dataSelectPayment,
      listProvince: dataSelectProvince,
      listSpecialty: dataSelectSpecialty,
      listClinic: dataSelectClinic,
    });
  }, [allDoctors, language, allRequiredDoctorInfo]);

  const handleSaveMarkDown = () => {
    dispatch(
      saveDetailDoctorAsync({
        contentHTML: state.contentHTML,
        contentMarkdown: state.contentMarkdown,
        description: state.descTextArea,
        doctorId: selectDoctor.value,
        action: state.hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        selectedPrice: state.selectedPrice.value,
        selectedPayment: state.selectedPayment.value,
        selectedProvince: state.selectedProvince.value,
        nameClinic: state.nameClinic,
        addressClinic: state.addressClinic,
        note: state.note,
        clinicId:
          state.selectedClinic && state.selectedClinic.value
            ? state.selectedClinic.value
            : "",
        specialtyId: state.selectedSpecialty.value,
      })
    );
  };

  const handleChangeSelect = async (selectedDoctor) => {
    setSelectDoctor(selectedDoctor);

    let res = await getDetailInfoDoctor(selectedDoctor.value);

    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedSpecialty = "",
        selectedClinic = "";

      if (res.data.Doctor_Info) {
        addressClinic = res.data.Doctor_Info.addressClinic;
        nameClinic = res.data.Doctor_Info.nameClinic;
        note = res.data.Doctor_Info.note;

        paymentId = res.data.Doctor_Info.paymentId;
        priceId = res.data.Doctor_Info.priceId;
        provinceId = res.data.Doctor_Info.provinceId;
        specialtyId = res.data.Doctor_Info.specialtyId;
        clinicId = res.data.Doctor_Info.clinicId;

        selectedPayment = state.listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = state.listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = state.listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = state.listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic = state.listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }

      setState({
        ...state,
        contentMarkdown: markdown.contentMarkdown,
        contentHTML: markdown.contentHTML,
        descTextArea: markdown.description,
        hasOldData: true,
        nameClinic: nameClinic,
        addressClinic: addressClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      setState({
        ...state,
        contentMarkdown: "",
        contentHTML: "",
        descTextArea: "",
        hasOldData: false,
        nameClinic: "",
        addressClinic: "",
        note: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedClinic: "",
        selectedSpecialty: "",
      });
    }
  };

  const handleChangeSelectDoctorInfo = async (selectedOptions, name) => {
    const stateName = name.name;
    let stateCopy = { ...state };
    stateCopy[stateName] = selectedOptions;

    setState({ ...stateCopy });
  };

  const handleOnChangeInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="manage-doctor-container">
      <div className="more-info">
        <div className="content-left form-group">
          <label>Chọn bác sĩ</label>
          <Select
            value={state.selectDoctor}
            onChange={handleChangeSelect}
            options={state.listDoctors}
            placeholder="Chọn bác sĩ"
          />
        </div>
        <div className="content-right form-group">
          <label>Thông tin giới thiệu</label>
          <textarea
            onChange={(e) =>
              setState({ ...state, descTextArea: e.target.value })
            }
            value={state.descTextArea}
            className="form-control"
          ></textarea>
        </div>
      </div>
      <div className="more-info-extra row">
        <div className="col-4 form-group">
          <label>Chọn giá</label>
          <Select
            value={state.selectedPrice}
            onChange={handleChangeSelectDoctorInfo}
            options={state.listPrice}
            placeholder="Chọn giá"
            name="selectedPrice"
          />
        </div>
        <div className="col-4 form-group">
          <label>Chọn phương thức thanh toán</label>
          <Select
            value={state.selectedPayment}
            onChange={handleChangeSelectDoctorInfo}
            options={state.listPayment}
            placeholder="Chọn phương thức thanh toán"
            name="selectedPayment"
          />
        </div>
        <div className="col-4 form-group">
          <label>Chọn tỉnh thành</label>
          <Select
            value={state.selectedProvince}
            onChange={handleChangeSelectDoctorInfo}
            options={state.listProvince}
            placeholder="Chọn tỉnh thành"
            name="selectedProvince"
          />
        </div>
        <div className="col-4 form-group">
          <label>Tên phòng khám</label>
          <input
            className="form-control"
            value={state.nameClinic}
            name="nameClinic"
            onChange={handleOnChangeInput}
          />
        </div>
        <div className="col-4 form-group">
          <label>Địa chỉ phòng khám</label>
          <input
            className="form-control"
            value={state.addressClinic}
            name="addressClinic"
            onChange={handleOnChangeInput}
          />
        </div>
        <div className="col-4 form-group">
          <label>Note</label>
          <input
            className="form-control"
            value={state.note}
            name="note"
            onChange={handleOnChangeInput}
          />
        </div>
        <div className="col-4 form-group">
          <label>Chọn chuyên khoa</label>
          <Select
            value={state.selectedSpecialty}
            onChange={handleChangeSelectDoctorInfo}
            options={state.listSpecialty}
            placeholder="Chọn chuyên khoa"
            name="selectedSpecialty"
          />
        </div>
        <div className="col-4 form-group">
          <label>Chọn phòng khám</label>
          <Select
            value={state.selectedClinic}
            onChange={handleChangeSelectDoctorInfo}
            options={state.listClinic}
            placeholder="Chọn phòng khám"
            name="selectedClinic"
          />
        </div>
      </div>

      <div className="manage-doctor-editor">
        <MdEditor
          style={{ height: "300px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          value={state.contentMarkdown}
        />
      </div>

      <button
        onClick={() => handleSaveMarkDown()}
        className={
          state.hasOldData
            ? "btn btn-warning mx-3 mt-3 "
            : "btn btn-success mx-3 mt-3"
        }
      >
        {state.hasOldData ? "Lưu thông tin" : "Tạo mới thông tin bác sĩ"}
      </button>
    </div>
  );
};

export default ManageDoctor;
