import React from "react";
import './End.css';
import store from "../../redux/store";


function End() {
    return (
        <div className='end'>
            <div>
                <div>{store.getState().winner}</div>
                <button className='restart-button' onClick={() => {
                    window.location.reload()
                }}> Попробовать снова
                </button>
            </div>
        </div>
    )
}

export default End;
