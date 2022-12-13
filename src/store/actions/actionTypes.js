const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //admin
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_ROLEID_SUCCESS: "FETCH_ROLEID_SUCCESS",
  SAVE_USER_SUCCESS: "SAVE_USER_SUCCESS",
  FETCH_ALL_USERS: "FETCH_ALL_USERS",
  DELETE_USER: "DELETE_USER",
  UPDATE_USER: "UPDATE_USER",
  FETCH_ALLCODE_SCHEDULE: "FETCH_ALLCODE_SCHEDULE",

  //home
  FETCH_TOP_DOCTOR: "FETCH_TOP_DOCTOR",
  FETCH_ALL_DOCTOR: "FETCH_ALL_DOCTOR",
  SAVE_DETAIL_DOCTOR: "SAVE_DETAIL_DOCTOR",
  FETCH_DOCTOR_INFO: "FETCH_DOCTOR_INFO",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",
  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",
});

export default actionTypes;