import {createSlice} from "@reduxjs/toolkit";
import {createSelector} from 'reselect';

const turnSelector=createSelector(state=>state.turn,result=>result);

let initialState=null;
const turnSlice=createSlice({
    name:'turn',
    initialState,
    reducers:{
        setTurn(state,action){
            state=action.payload;
            return state
        }
    }
});

const turnReducer=turnSlice.reducer;
const {setTurn:setTurnAction}=turnSlice.actions;

export default turnReducer
export {setTurnAction,turnSelector}