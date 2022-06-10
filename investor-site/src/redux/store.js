import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from "./ProjectReducer";
import messagesSlice from "./messagesSlice";
import userReducer from "./userReducer";
import profileState from "./ProfileState";
import currentStudentState from "./currentStudentState";

export const store = configureStore(
    {
        reducer : {
            projectReducer : ProjectReducer,
            messagesReducer : messagesSlice,
            currentUser : userReducer,
            profileState :profileState,
            currentStudent : currentStudentState,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
             }),
    }
);