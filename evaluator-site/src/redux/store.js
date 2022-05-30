import { configureStore } from "@reduxjs/toolkit";
import ProjectReducer from "./ProjectReducer";
import messagesSlice from "./messagesSlice";

export const store = configureStore(
    {
        reducer : {
            projectReducer : ProjectReducer,
            messagesReducer : messagesSlice,
        }
    }
);