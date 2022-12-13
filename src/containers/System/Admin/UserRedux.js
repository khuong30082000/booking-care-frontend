import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CRUD_ACTIONS, LANGUAGES, CommonUtils } from "../../../utils";
import {
  fetchGenderAsync,
  fetchPositionAsync,
  fetchRoleIdAsync,
  createNewUserAsync,
  updateUserAsync,
} from "../../../store/actions";
import IconLoaidng from "../../../components/IconLoading";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Swal from "sweetalert2";
import TableUserManage from "./TableManageUser";

const UserRedux = () => {
  const language = useSelector((state) => state.app.language);
  const genders = useSelector((state) => state.admin.genders);
  // const message = useSelector((state) => state.admin.message);
  const listUsers = useSelector((state) => state.admin.users);
  const positions = useSelector((state) => state.admin.positions);
  const roleIds = useSelector((state) => state.admin.roles);
  const isLoading = useSelector((state) => state.admin.isLoading);
  const [arrGender, setArrGender] = useState([]);
  const [arrPosition, setArrPosition] = useState([]);
  const [arrRoleId, setArrRoleId] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [actionType, setActionType] = useState("");

  const defaultValue = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    gender: "",
    position: "",
    roleId: "",
    avatar: "",
    userEditId: "",
  };

  const [objRequest, setObjRequest] = useState(defaultValue);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenderAsync());
    dispatch(fetchPositionAsync());
    dispatch(fetchRoleIdAsync());
  }, [dispatch]);

  useEffect(() => {
    setArrGender(genders);
    setArrPosition(positions);
    setArrRoleId(roleIds);
    setObjRequest({
      ...objRequest,
      gender: genders && genders.length > 0 ? genders[0].keyMap : "",
      position: positions && positions.length > 0 ? positions[0].keyMap : "",
      roleId: roleIds && roleIds.length > 0 ? roleIds[0].keyMap : "",
    });
    setObjRequest({
      ...defaultValue,
      gender: genders && genders.length > 0 ? genders[0].keyMap : "",
      position: positions && positions.length > 0 ? positions[0].keyMap : "",
      roleId: roleIds && roleIds.length > 0 ? roleIds[0].keyMap : "",
    });

    setActionType(CRUD_ACTIONS.CREATE);
  }, [genders, positions, roleIds, listUsers]);

  const handleOnChangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      setPreviewImgUrl(objectUrl);
      setObjRequest({
        ...objRequest,
        avatar: base64,
      });
    }
  };

  const handleOnChangeInput = (e) => {
    setObjRequest({
      ...objRequest,
      [e.target.name]: e.target.value,
    });
  };

  const checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "gender",
      "position",
      "roleId",
      "avatar",
    ];

    for (let i = 0; i <= arrCheck.length; i++) {
      if (!objRequest[arrCheck[i]]) {
        isValid = false;
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `Bạn chưa nhập ${arrCheck[i]}`,
          showConfirmButton: false,
          timer: 1500,
        });
        break;
      }
    }
    return isValid;
  };

  const handleSave = () => {
    // let isValid = checkValidateInput();
    // if (!isValid) return;
    if (actionType === CRUD_ACTIONS.CREATE) {
      dispatch(createNewUserAsync(objRequest));
      setPreviewImgUrl("");
    }
    if (actionType === CRUD_ACTIONS.EDIT) {
      dispatch(updateUserAsync(objRequest));
      setPreviewImgUrl("");
    }

    //goi api
  };

  const handlEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    setPreviewImgUrl(imageBase64);

    setActionType(CRUD_ACTIONS.EDIT);
    setObjRequest({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      roleId: user.roleId,
      avatar: "",
      id: user.id,
    });
  };

  return (
    <>
      <div className="user-redux-container">
        <div className="title text-center">Thêm mới người dùng</div>
        {isLoading === false ? (
          <IconLoaidng />
        ) : (
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <label>Email</label>
                  <input
                    value={objRequest.email}
                    name="email"
                    className="form-control"
                    type="email"
                    disabled={actionType === CRUD_ACTIONS.EDIT}
                    onChange={handleOnChangeInput}
                  />
                </div>
                <div className="col-3">
                  <label>Password</label>
                  <input
                    value={objRequest.password}
                    name="password"
                    className="form-control"
                    type="password"
                    onChange={handleOnChangeInput}
                    disabled={actionType === CRUD_ACTIONS.EDIT}
                  />
                </div>
                <div className="col-3">
                  <label>First name</label>
                  <input
                    value={objRequest.firstName}
                    name="firstName"
                    className="form-control"
                    type="text"
                    onChange={handleOnChangeInput}
                  />
                </div>
                <div className="col-3">
                  <label>Last name</label>
                  <input
                    value={objRequest.lastName}
                    name="lastName"
                    className="form-control"
                    type="text"
                    onChange={handleOnChangeInput}
                  />
                </div>
                <div className="col-3">
                  <label>phone number</label>
                  <input
                    value={objRequest.phoneNumber}
                    name="phoneNumber"
                    className="form-control"
                    type="text"
                    onChange={handleOnChangeInput}
                  />
                </div>
                <div className="col-9">
                  <label>address</label>
                  <input
                    value={objRequest.address}
                    name="address"
                    className="form-control"
                    type="text"
                    onChange={handleOnChangeInput}
                  />
                </div>
                <div className="col-3">
                  <label>gender</label>
                  <select
                    value={objRequest.gender}
                    className="form-control"
                    name="gender"
                    onChange={handleOnChangeInput}
                  >
                    {arrGender &&
                      arrGender.length > 0 &&
                      arrGender.map((item, idx) => {
                        return (
                          <option key={idx} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>position</label>
                  <select
                    value={objRequest.position}
                    className="form-control"
                    name="position"
                    onChange={handleOnChangeInput}
                  >
                    {arrPosition &&
                      arrPosition.length > 0 &&
                      arrPosition.map((item, idx) => {
                        return (
                          <option key={idx} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>RoleId</label>
                  <select
                    className="form-control"
                    name="roleId"
                    value={objRequest.roleId}
                    onChange={handleOnChangeInput}
                  >
                    {arrRoleId &&
                      arrRoleId.length > 0 &&
                      arrRoleId.map((item, idx) => {
                        return (
                          <option key={idx} value={item.keyMap}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-3">
                  <label>Image</label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(e) => handleOnChangeImg(e)}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      Tai ảnh<i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      onClick={() => setIsOpen(true)}
                      style={{ backgroundImage: `url(${previewImgUrl})` }}
                    ></div>
                  </div>
                </div>
                <div className="col-12 mt-3">
                  <button
                    className={
                      actionType === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning"
                        : "btn btn-primary"
                    }
                    onClick={handleSave}
                  >
                    {actionType === CRUD_ACTIONS.EDIT ? "Lưu" : "Thêm"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {isOpen && (
          <Lightbox
            mainSrc={previewImgUrl}
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
      </div>
      <TableUserManage
        actionType={actionType}
        handlEditUserFromParent={handlEditUserFromParent}
      />
      <div className="mb-5"></div>
    </>
  );
};

export default UserRedux;
