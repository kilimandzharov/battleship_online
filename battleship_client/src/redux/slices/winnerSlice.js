import {createSlice} from "@reduxjs/toolkit";

const initialState=null;
const winnerSlice=createSlice({
    name:'winner',
    initialState,
    reducers:{
        setWinner(state,action){
            if(action.payload){
                state='Вы победили'
            } else{
                state='Вы проиграли'
            }
            return state
        }
    }

});

const winnerReducer=winnerSlice.reducer;
const {setWinner:setWinnerAction}=winnerSlice.actions;

export default winnerReducer
export {setWinnerAction}