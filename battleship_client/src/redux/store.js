import {configureStore} from '@reduxjs/toolkit';
import stageReducer from "./slices/stageSlice";
import computerMarkReducer from "./slices/computerMarkSlice";
import playerMarkReducer from "./slices/playerMarkSlice";
import turnReducer from "./slices/turnSlice";
import winnerReducer from "./slices/winnerSlice";

const store=configureStore({
    reducer:{
        stage:stageReducer,
        computerMark:computerMarkReducer,
        playerMark:playerMarkReducer,
        turn:turnReducer,
        winner:winnerReducer
    }
});

export default store