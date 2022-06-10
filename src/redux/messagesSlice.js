import { createSlice } from "@reduxjs/toolkit";

const msgSlice = createSlice(
    {
        name : 'Messages Reducer',
        initialState : {
            messages:[]
        },
        reducers : {
            setMessages : (state,action)=>{state.messages = action.payload},
        },
    }
)

export const { setMessages } = msgSlice.actions
export default msgSlice.reducer