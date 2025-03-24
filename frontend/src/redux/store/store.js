import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlices";


//create the store
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});