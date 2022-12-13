import actionTypes from "./actionTypes";
import {
  getAllCode,
  createNewUser,
  getAllUsers,
  deleteUser,
  editUser,
  getAllSpecialty,
  getAllClinic,
} from "../../services/userService";

import { toast } from "react-toastify";

//action
export const fetchGender = (gender) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  payload: {
    gender,
  },
});

export const fetchPosition = (position) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  payload: {
    position,
  },
});

export const fetchRoleId = (roleId) => ({
  type: actionTypes.FETCH_ROLEID_SUCCESS,
  payload: {
    roleId,
  },
});

export const createNewUserAction = (message) => ({
  type: actionTypes.SAVE_USER_SUCCESS,
  payload: {
    message,
  },
});

export const fetchAllUsers = (users) => ({
  type: actionTypes.FETCH_ALL_USERS,
  payload: {
    users,
  },
});

export const deleteUserAction = () => ({
  type: actionTypes.DELETE_USER,
});

export const updateUserAction = () => ({
  type: actionTypes.UPDATE_USER,
});

export const fetchAllSchedule = (scheduleTime) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE,
  payload: {
    scheduleTime,
  },
});

export const fetchDoctorInfo = (genderData) => ({
  type: actionTypes.FETCH_DOCTOR_INFO,
  payload: {
    data: genderData,
  },
});

//action async

export const fetchGenderAsync = () => {
  return async (dispatch) => {
    try {
      const res = await getAllCode("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGender(res));
      }
    } catch (error) {}
  };
};
export const fetchPositionAsync = () => {
  return async (dispatch) => {
    try {
      const res = await getAllCode("position");

      if (res && res.errCode === 0) {
        dispatch(fetchPosition(res));
      }
    } catch (error) {}
  };
};
export const fetchRoleIdAsync = () => {
  return async (dispatch) => {
    try {
      const res = await getAllCode("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleId(res));
      }
    } catch (error) {}
  };
};

export const createNewUserAsync = (data) => {
  return async (dispatch) => {
    try {
      let res = await createNewUser(data);
      if (res && res.errCode === 0) {
        toast.success("Create new user success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(createNewUserAction());
        dispatch(fetchAllUsersAsync());
      }
    } catch (error) {}
  };
};

export const fetchAllUsersAsync = () => {
  return async (dispatch) => {
    try {
      let res = await getAllUsers();
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsers(res.user.reverse()));
      }
    } catch (error) {}
  };
};

export const deleteUserAsync = (id) => {
  return async (dispatch) => {
    try {
      let res = await deleteUser(id);
      if (res && res.errCode === 0) {
        dispatch(deleteUserAction());
        dispatch(fetchAllUsersAsync());
      }
    } catch (error) {}
  };
};

export const updateUserAsync = (inputData) => {
  return async (dispatch) => {
    try {
      let res = await editUser(inputData);
      if (res && res.errCode === 0) {
        toast.success("Update user success", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(updateUserAction());
        dispatch(fetchAllUsersAsync());
      }
    } catch (error) {}
  };
};

export const fetchAllSheduleAsync = () => {
  return async (dispatch) => {
    try {
      const res = await getAllCode("time");

      if (res && res.errCode === 0) {
        dispatch(fetchAllSchedule(res.data));
      }
    } catch (error) {}
  };
};

export const fetchDoctorInfoAsync = () => {
  return async (dispatch) => {
    try {
      const resPrice = await getAllCode("PRICE");
      const resPayment = await getAllCode("PAYMENT");
      const resProvince = await getAllCode("PROVINCE");
      const resSpecialty = await getAllSpecialty();
      const resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchDoctorInfo(data));
      }
    } catch (error) {}
  };
};
