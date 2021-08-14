import React from 'react';
import './Waiting.css';

function Waiting() {
    let [dots,setDots]=React.useState(1);
    React.useEffect(()=>{
            setTimeout(()=>{
                if(dots>=3){
                    setDots(1);
                } else{
                    setDots(prevState => {
                        prevState++
                        return prevState
                    });
                }
            },400);


    },[dots])
    return (
        <div className='waiting-container'>
            <div>
                <span className='waiting'>Происходит поиск соперника</span>
                <span className='dots'>{new Array(dots).fill('.').reduce((accum,elem)=>accum+elem,'')}</span>
            </div>

            <img src='loader.gif'/>
        </div>
    )
}

export default Waiting