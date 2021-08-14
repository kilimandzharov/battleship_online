import React from 'react';
import './Game.css';
import Computer from "../Computer/Computer";
import Player from "../Player/Player";
import Turn from "../Turn/Turn";

function Game({ships,socket}) {

    return (
            <div className='game'>
                <Computer socket={socket}/>
                <Player ships={ships}/>
                <Turn/>
            </div>
    )
}

export default Game