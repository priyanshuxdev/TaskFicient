import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./taskSlice";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    tasks: taskSlice,
    auth: authSlice,
  },
});
