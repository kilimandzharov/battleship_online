import React from 'react';
import './App.css';
import Dispose from "../Dispose/Dispose";
import Game from '../Game/Game';
import {useSelector} from "react-redux";
import {endingAction, stageSelector} from "../../redux/slices/stageSlice";
import store from '../../redux/store';
import {searchingAction, startingAction, breakingAction} from "../../redux/slices/stageSlice";
import Waiting from "../Waiting/Waiting";
import Break from "../Break/Break";
import {addPlayerMarkAction} from "../../redux/slices/playerMarkSlice";
import {addComputerMarkAction} from "../../redux/slices/computerMarkSlice";
import {setTurnAction} from "../../redux/slices/turnSlice";
import {setWinnerAction} from "../../redux/slices/winnerSlice";
import End from "../End/End";

const ws = new WebSocket('ws://localhost:8000');
ws.onmessage = (event) => {
    let data = event.data;
    if (data === 'search') {
        store.dispatch(searchingAction());
    } else if (data === 'start') {
        store.dispatch(startingAction());
    } else if (data === 'break') {
        store.dispatch(breakingAction());
    } else if(data ==='end'){
        store.dispatch(endingAction())
    } {
        data = JSON.parse(data);
        if (data.address === 'player') {
            store.dispatch(addPlayerMarkAction(data));
        } else if (data.address === 'computer') {
            store.dispatch(addComputerMarkAction(data));
        } else if (data.group === 'setTurn') {
            console.log(data);
            store.dispatch(setTurnAction(data.turn));
        } else if(data.group ==='end'){
            store.dispatch(setWinnerAction(data.win));
        }
    }
}

function App() {

    const stage = useSelector(stageSelector);

    let [ships, setShips] = React.useState(
        [{
            id: Symbol(),
            size: 4,
            status: 'Bar',
            coords: null,
            reversed: false
        },
            {
                id: Symbol(),
                size: 3,
                status: "Bar",
                coords: null,
                reversed: false
            },
            {
                id: Symbol(),
                size: 3,
                status: "Bar",
                coords: null,
                reversed: false
            },
            {
                id: Symbol(),
                size: 2,
                status: "Bar",
                coords: null,
                reversed: false
            },
            {
                id: Symbol(),
                size: 2,
                status: "Bar",
                coords: null,
                reversed: false
            },
            {
                id: Symbol(),
                size: 2,
                status: "Bar",
                coords: null,
                reversed: false,
            },
            {
                id: Symbol(),
                size: 1,
                status: "Bar",
                coords: null,
                reversed: false
            },
            {
                id: Symbol(),
                size: 1,
                status: "Bar",
                coords: null,
                reversed: false
            },
            {
                id: Symbol(),
                size: 1,
                status: "Bar",
                coords: null,
                reversed: false
            },
            {
                id: Symbol(),
                size: 1,
                status: "Bar",
                coords: null,
                reversed: false
            }]
    );

    if (stage === "start") {
        var info = ships.map(element => ({
            coords: element.coords,
            size: element.size,
            reversed: element.reversed
        }))
    }

    return (
        <div className='app'>
            <div className='app-container'>
                {
                    stage === 'disposing' ?
                        <Dispose ships={ships} setShips={setShips} socket={ws}/> : stage === 'search' ?
                        <Waiting/> : stage === 'break' ?
                            <Break/> : stage ==='start' ?
                            <Game ships={info} socket={ws}/>:<End/>
                }
            </div>
        </div>
    )
}

export default App