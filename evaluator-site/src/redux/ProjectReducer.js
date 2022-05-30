import { createSlice } from "@reduxjs/toolkit";

const projectSlice = createSlice({
    name : 'Project Slice',
    initialState : {
        projects : [
            {
                projectName :'water project',
                category : 'Health Care',
                studentName :  'Jay',
                description : '<h1 class="text-[2rem]"><b>a powerful way to live life</b></h1>',
                approved : false,
                hasInvestor : false,
                id : 0,
            },
            {
                projectName :'Fire project',
                category : 'Health Care',
                studentName :  'Jay',
                description : '<h1 class="text-[2rem]"><b>a powerful way to live life </b></h1>',
                approved : true,
                hasInvestor : false,
                id : 1 ,
            },
            {
                projectName :'Earth project',
                category : 'Corruption',
                studentName :  'Jay',
                description : '<h1><b>a powerful way to live life</b></h1><span>hello world</span>',
                approved : true,
                hasInvestor : false,
                id : 2,
            },
        ],
        currentProject :null
    },
    reducers : {
        setCurrentProject : (state,action)=>{state.currentProject = action.payload; },
        setProjects : (state,action)=>state.projects =action.payload
    },
})

export const { setProjects ,setCurrentProject } = projectSlice.actions
export default projectSlice.reducer