import {
  getAllDoctors,
  getTopDoctorHome,
  saveDetailDoctor,
} from "../../services/userService";
import actionTypes from "./actionTypes";
import { toast } from "react-toastify";
//action
export const fetchTopDoctor = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR,
  payload: {
    data,
  },
});

export const fetchAllDoctors = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTOR,
  payload: {
    data,
  },
});

export const saveDetailDoctorAction = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR,
});

//action Async

export const fetchTopDoctorAsync = () => {
  return async (dispatch) => {
    try {
      let res = await getTopDoctorHome(10);
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctor(res.data));
      }
    } catch (error) {}
  };
};

export const fetchAllDoctorsAsync = () => {
  return async (dispatch) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctors(res.data));
      }
    } catch (error) {}
  };
};

export const saveDetailDoctorAsync = (inputData) => {
  return async (dispatch) => {
    try {
      let res = await saveDetailDoctor(inputData);
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
        dispatch(saveDetailDoctorAction());
      } else {
        toast.error(`${res.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {}
  };
};
