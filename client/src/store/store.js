import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice/userSlice";
export const store = configureStore({
    reducer: { user: UserSlice },
});
