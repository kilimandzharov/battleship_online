import React from 'react';
import './DropDesk.css';
import Table from "../Table/Table";
import {useDrop} from 'react-dnd';
import countCoords from '../../functions/countCoords';


function DropDesk({setInner, canDrop, ...props}) {
    const [{}, drop] = useDrop({
        accept: 'ship',
        drop: (item, monitor) => {

            setInner(prevState => {
                const object = prevState.find((element) => element.id === item.id);
                object.status = 'Table';
                let monCords = monitor.getSourceClientOffset();
                object.coords=countCoords(monCords,'create');
                return prevState.map(element => element.id === item.id ? object : element);
            })
        },
        canDrop: canDrop,
        collect:(monitor)=>({
            canDrop:!!monitor.canDrop()
        })
    });

    return (
        <div ref={drop} className='drop-desk' onContextMenu={(event)=>event.preventDefault()}>
            <Table></Table>
            {props.children}
        </div>
    )
}

export default DropDesk