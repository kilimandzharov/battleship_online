import React from 'react';
import Table from '../Table/Table';
import {useSelector} from "react-redux";
import {computerMarkSelector} from "../../redux/slices/computerMarkSlice";
import Mark from "../Mark/Mark";
import store from "../../redux/store";

function Computer(props) {
    const info=useSelector(computerMarkSelector);

    return (
        <div className='computer' onClick={(event) => {

            if (!store.getState().turn || event.target.className!=='cell') {
                return
            }
            let coordinates = {x: event.nativeEvent.pageX, y: event.nativeEvent.pageY};
            let elem = document.querySelector('.computer');
            let parentOffset = {
                x: elem.offsetLeft,
                y: elem.offsetTop
            };
            coordinates.x = Math.floor((coordinates.x - parentOffset.x) / 50) * 50;
            coordinates.y = Math.floor((coordinates.y - parentOffset.y) / 50) * 50;
            const data=JSON.stringify({
                type:'move',
                x:coordinates.x,
                y:coordinates.y
            });
            props.socket.send(data);


        }}>

            <Table>{info.map(element=><Mark type={element.type} x={element.x} y={element.y}/>)}</Table>
        </div>
    )
}

export default Computer