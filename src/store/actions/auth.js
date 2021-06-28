import * as TYPES from "../types/auth";

export const setAuthInfo = (user) => {
  return {
    type: TYPES.LOGIN,
    payload: user,
  };
};
