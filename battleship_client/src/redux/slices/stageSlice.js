import {createSelector} from 'reselect';
import {createSlice} from '@reduxjs/toolkit';

const initialState='disposing';
const stageSlice=createSlice({
    name:'stage',
    initialState,
    reducers:{
        searching(state,action){
            state='search';
            return state;
        },
        starting(state,action){
            state='start';
            return state;
        },
        breaking(state,action){
            state='break';
            return state;
        },
        disposing(state,action){
            state='disposing';
            return state;
        },
        ending(state,action){
            state='ending';
            return state
        }
    }
});

export const stageSelector=createSelector(state=>state.stage,stage=>stage);
export const {searching:searchingAction,starting:startingAction,breaking:breakingAction,disposing:disposingAction,ending:endingAction}=stageSlice.actions;
const stageReducer=stageSlice.reducer;
export default stageReducer;