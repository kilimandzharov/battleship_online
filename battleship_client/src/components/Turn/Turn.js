import React from 'react';
import './Turn.css';
import {useSelector} from "react-redux";
import {turnSelector} from "../../redux/slices/turnSlice";

function Turn(props){
    const turn=useSelector(turnSelector);
    return(
        <div className='turn'> {turn?'Ваш ход':'Ход противника'}</div>
    )
}

export default Turn