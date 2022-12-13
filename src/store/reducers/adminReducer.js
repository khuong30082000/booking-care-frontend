import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  users: [],
  isLoading: false,
  message: "",
  scheduleTime: [],
  allRequiredDoctorInfo: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_SUCCESS:
      return {
        ...state,
        isLoading: true,
        genders: action.payload.gender.data,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      return {
        ...state,
        isLoading: true,
        positions: action.payload.position.data,
      };
    case actionTypes.FETCH_ROLEID_SUCCESS:
      return {
        ...state,
        isLoading: true,
        roles: action.payload.roleId.data,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE:
      return {
        ...state,
        scheduleTime: action.payload.scheduleTime,
      };
    case actionTypes.SAVE_USER_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
      };
    case actionTypes.FETCH_ALL_USERS:
      return {
        ...state,
        users: action.payload.users,
      };

    case actionTypes.FETCH_DOCTOR_INFO:
      return {
        ...state,
        allRequiredDoctorInfo: action.payload.data,
      };

    default:
      return state;
  }
};

export default appReducer;
