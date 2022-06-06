import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from "./ProjectReducer";
import messagesSlice from "./messagesSlice";
import userReducer from "./userReducer";
import profileState from "./ProfileState";

export const store = configureStore(
    {
        reducer : {
            projectReducer : ProjectReducer,
            messagesReducer : messagesSlice,
            currentUser : userReducer,
            profileState :profileState,
        }
    }
);