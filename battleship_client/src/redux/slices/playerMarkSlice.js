import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from 'reselect';



const playerMarkSelector=createSelector(state=>state.playerMark,result=>result);

let initialState=[];
const playerMarkSlice=createSlice({
    name:'playerMark',
    initialState,
    reducers:{
        addMark(state,action){
            state.push(action.payload);
            return state
        }

    }
});

const playerMarkReducer=playerMarkSlice.reducer;
const {addMark:addPlayerMarkAction}=playerMarkSlice.actions;
export default playerMarkReducer
export {playerMarkSelector,addPlayerMarkAction}

