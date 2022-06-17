import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name : 'Project Slice',
    initialState : {
        projects : [
            {
                
            },
            {
                
            },
            {
                
            },
        ],
        currentProject :null
    },
    reducers : {
        setCurrentProject : (state,action)=>{state.currentProject = action.payload; },
        setProjects : (state,action)=>{state.projects =action.payload},
        setProjectListener :  (state,action)=>{state.currentProject.hasListener = action.payload},
    },
})

export const { setProjects ,setCurrentProject,setProjectListener } = projectSlice.actions
export default projectSlice.reducer