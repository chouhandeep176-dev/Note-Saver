import { configureStore } from "@reduxjs/toolkit";
import noteSaverReducer from "./features/noteSaver.js";

export const store = configureStore({
  
  reducer: {
    noteSaver: noteSaverReducer,
  },
  
});
