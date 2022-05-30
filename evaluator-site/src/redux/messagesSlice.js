import { createSlice } from "@reduxjs/toolkit";

const msgSlice = createSlice(
    {
        name : 'Messages Reducer',
        initialState : {
            messages:[
                {left :true ,text:'Hello how are you ?'},
                {left :false ,text:'I am Fine How About you Mr Exsampl?'},
                {left :true ,text:'Hello how are you ?'},
                {left :false ,text:'Hello how are you ?'},
                {left :false ,text:'Hello how are you ?'},
                {left :false ,text:'Hello how are you ?'},
            ]
        },
        reducers : {
            setMessages : (state,action)=>{state.messages = action.payload},
        },
    }
)

export const { setMessages } = msgSlice.actions
export default msgSlice.reducer