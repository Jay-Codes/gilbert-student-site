import { configureStore  } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import projectState from './projectState'
import profileState from './ProfileState'
import messageReducer from './messagesSlice'

export const store = configureStore({
    reducer : {
        currentUser :userReducer,
        projectState : projectState,
        profileState : profileState,
        messageReducer : messageReducer,
    },
    middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
             }),
})