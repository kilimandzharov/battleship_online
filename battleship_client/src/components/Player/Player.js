import React from 'react';
import './Player.css';
import Table from "../Table/Table";
import Ship from "../Ship/Ship";
import {useSelector} from "react-redux";
import {playerMarkSelector} from "../../redux/slices/playerMarkSlice";
import Mark from '../Mark/Mark';

function Player({ships}){
    const marks=useSelector(playerMarkSelector);
    return(
        <div className='player'>
        <Table>
            { ships.map(element => <div
                style={{left: element.coords.x, top: element.coords.y, position: 'absolute'}}>
                <Ship reversed={element.reversed} size={element.size}/>
            </div>) }
            {marks.map(element=><Mark type={element.type} x={element.x} y={element.y} />)}
        </Table>
        </div>
    )
}

export default Player;