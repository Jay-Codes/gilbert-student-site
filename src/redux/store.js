import { configureStore  } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import projectState from './projectState'
import profileState from './ProfileState'

export const store = configureStore({
    reducer : {
        currentUser :userReducer,
        projectState : projectState,
        profileState : profileState,
    }
})