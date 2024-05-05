// src/store/reducers.ts
import { SET_USER_INFO } from "./actionTypes";
const initialState = {
  name: "",
  dealerPhoneNumber: "",
  phoneNumber: "",
  dealerId: "",
  role: "USER",
  id: "",
  isActive: false,
  isVerified: false,
  token: "",
};

export const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
