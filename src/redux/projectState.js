import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name:'Project State',
    initialState : {
        uploadProject : {},
        projects : [
            // {projectName:'ordering system',instructor:true , investor : true ,comments:'Good project check on your execution'},
            // {projectName:'app',instructor:true , investor : false ,comments:'Good project check on your execution'},
            // {projectName:'webstie',instructor:null , investor : null ,comments:'Good project check on your execution'},
            // {projectName:'water system',instructor:false , investor : null ,comments:'Good project check on your execution'},
        ],
        allProjects : []
    },
    reducers:{
        setUploadProject: (state,action)=>{state.uploadProject = action.payload},
        setProjects : (state,action)=>{state.projects = action.payload},
        setAllProjects : ( state , action ) => {state.allProjects =action.payload},
    },
});

export default projectSlice.reducer
export const { setUploadProject,setProjects,setAllProjects} = projectSlice.actions