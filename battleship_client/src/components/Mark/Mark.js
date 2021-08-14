import React from 'react';
import './Mark.css';

function Mark(props) {
    if(props.type==='cross'){
        return (
            <img className='mark' style={{left:props.x,top:props.y,position:'absolute', height:'30px',width:'30px',marginLeft:'10px',marginTop:'10px'}} src='https://img.icons8.com/color/452/flash-bang.png'/>
        )
    }
    return(
        <img src="https://img.icons8.com/color/48/000000/unchecked-circle.png" className='mark' style={{left:props.x,top:props.y,position:'absolute', height:'14px',width:'14px',marginLeft:'18px',marginTop:'18px'}}/>
        )


}

export default Mark