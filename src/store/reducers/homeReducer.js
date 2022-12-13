import actionTypes from "../actions/actionTypes";

const initialState = {
  dataTopDoctors: [],
  allDoctors: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TOP_DOCTOR:
      return {
        ...state,
        dataTopDoctors: action.payload.data,
      };
    case actionTypes.FETCH_ALL_DOCTOR:
      return {
        ...state,
        allDoctors: action.payload.data,
      };

    default:
      return state;
  }
};

export default appReducer;
