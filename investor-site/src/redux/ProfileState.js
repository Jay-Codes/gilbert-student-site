import { createSlice } from "@reduxjs/toolkit";

const profileState = createSlice(
    {
        name :'profile slice',
        initialState : {
        },
        reducers : {
            setProfile : (state,action)=>{state = action.payload}
        }
    }
);

export default profileState;
export const { setProfile } = profileState.actions 