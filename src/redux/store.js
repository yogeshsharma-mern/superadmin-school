
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import uiReducer from "../redux/features/ui/uiSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
    }
})