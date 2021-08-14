import {createSelector} from 'reselect';
import {createSlice} from '@reduxjs/toolkit';



const initialState=[];
const computerMarkSlice=createSlice({
    name:'computerMark',
    initialState,
    reducers:{
        addMark(state,action){
            state.push(action.payload);

            return state
        }
    }
})

const computerMarkSelector=createSelector( state=>state.computerMark, result=>result);

const {addMark:addComputerMarkAction}=computerMarkSlice.actions;
export {computerMarkSelector,addComputerMarkAction}
const computerMarkReducer=computerMarkSlice.reducer;
export default computerMarkReducer

