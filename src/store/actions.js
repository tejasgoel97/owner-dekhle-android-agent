// src/store/actions.ts
import { SET_USER_INFO } from "./actionTypes";

export const setUserInfo = (userInfo) => {
  const serializedState = JSON.stringify(state);
  AsyncStorage.setItem("userInfo", serializedState);
  return {
    type: SET_USER_INFO,
    payload: userInfo,
  };
};
