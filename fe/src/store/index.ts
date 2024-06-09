import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import profile from "./profile";
import course from "./course";
import cart from "./cart";

const reducer = combineReducers({
  // here we will be adding reducers
  profile,
  course,
  cart,
});
export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
