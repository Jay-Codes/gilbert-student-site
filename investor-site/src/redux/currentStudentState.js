import { createSlice } from "@reduxjs/toolkit";
const studentSlice = createSlice({
    name : 'student slice',
    initialState : {
        currentStudent : null,
    },
    reducers : {
        setCurrentStudent :  (state,action)=>{
            state.currentStudent = action.payload
        }
    }
});

export const { setCurrentStudent } = studentSlice.actions
export default studentSlice.reducer