import React from 'react';
import './Break.css';


function Break() {

    function evalRefreshClick() {
        window.location.reload();
    }

    return (
        <div className='break'>
            <div>
                <div>
                    К сожалению, противник вышел из боя.
                </div>
                <button onClick={evalRefreshClick}>Найти другого противника</button>
            </div>
        </div>
    )
}

export default Break;