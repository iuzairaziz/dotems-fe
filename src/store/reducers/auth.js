import * as actionTypes from "../types/auth";
const initialState = {
  auth: {},
};

const auth = (state = null, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
