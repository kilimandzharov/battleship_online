import './Dispose.css';
import DropDesk from "../DropDesk/DropDesk";
import React from 'react';
import Bar from "../Bar/Bar";
import {DndProvider} from 'react-dnd';
import DragShip from "../DragShip/DragShip";
import Preview from "../Preview/Preview";
import countCoords from "../../functions/countCoords";
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import createCells from "../../functions/createCells";
import Info from "../Info/Info";
import {useDispatch} from "react-redux";



function Dispose({ships,setShips,socket}) {
    const dispatch=useDispatch()
    function onStart(){

        if(!ships.filter(element=>element.status==='Bar').length){
            var info=ships.map(element=>({
                coords:element.coords,
                size:element.size,
                reversed:element.reversed
            }));
            var arrayInfo=new Array(10).fill(0).map(e=>new Array(10).fill(0));

            let changedShips=info.map(element=>createCells(element,'outline')).map(element=>element.map(el=>({x:el.x/50,y:el.y/50}))).flat(1);
            for(let item of changedShips){
                arrayInfo[item.y][item.x]=1;
            }

            let data={
                type:'search',
                disposition:arrayInfo
            }
            data=JSON.stringify(data);
            socket.send(data);

        } else{
            alert('Расставьте все корабли по полю, чтобы начать играть')
        }


    }

    function canDrop(item, monitor) {

        function checkSur(extraItem) {
            let infoAreaCells = ships.filter(element => element.coords && element.id !== extraItem.id)
                .map(element => ({
                    coords: element.coords,
                    reversed: element.reversed,
                    size: element.size
                })).map(element => createCells(element, 'area'))


            let infoDragCells = createCells(extraItem, 'outline');





            for (let areaItem of infoAreaCells) {
                for (let areaCell of areaItem) {
                    for (let dragCell of infoDragCells) {
                        if (areaCell.x === dragCell.x && areaCell.y === dragCell.y) {
                            return false
                        }
                    }

                }
            }
            return true
        }


        const elem = document.querySelector('.drop-desk');
        const parentOffset = {
            x: elem.offsetLeft,
            y: elem.offsetTop
        };
        const rightItemCoords = {
            x: monitor.getSourceClientOffset().x,
            y: monitor.getSourceClientOffset().y
        }
        const itemCoordsFromParent = countCoords(rightItemCoords,);
        const extraItem = {
            ...item, coords:
                {
                    x: itemCoordsFromParent.x,
                    y: itemCoordsFromParent.y
                }
        };
        rightItemCoords.x+= + window.pageXOffset;
        rightItemCoords.y+= + window.pageYOffset;

        const firstCondition = !(rightItemCoords.x + 20 < parentOffset.x || rightItemCoords.y + 20 < parentOffset.y ||
            (item.reversed && (rightItemCoords.x + item.size * 50 > parentOffset.x + 520 || rightItemCoords.y + 50 > parentOffset.y + 520))
            || (!item.reversed && (rightItemCoords.x + 50 > parentOffset.x + 520 || rightItemCoords.y + 50 * item.size > parentOffset.y + 520)));
        const secondCondition = checkSur(extraItem);
        return firstCondition && secondCondition
    }


    function evalRightClick(event, status, id, size) {
        event.preventDefault();
        if (status === 'Bar') {
            return
        }
        let elem = ships.find((element) => element.id === id);
        const copy = {...elem};
        copy.reversed = !copy.reversed;
        let value = elem.reversed;

        if (value) {
            if (elem.size > 10 - elem.coords.y / 50) {
                return
            }
        } else {
            if (elem.size > 10 - elem.coords.x / 50) {
                return
            }
        }

        let infoDragCells = createCells(copy, 'outline');
        let infoAreaCells = ships.filter(element => element.id !== elem.id && element.coords).map(element => createCells(element, 'area'));

        for (let areaItem of infoAreaCells) {
            for (let areaCell of areaItem) {
                for (let dragCell of infoDragCells) {
                    if (areaCell.x === dragCell.x && areaCell.y === dragCell.y) {
                        return false
                    }
                }

            }
        }

        setShips(prevState => {
            let el = prevState.find((element) => element.id === id);
            el.reversed = !el.reversed;
            return [...prevState]

        })


    }

    return (

        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
            <div className='dispose'>
                <DropDesk setInner={setShips} canDrop={canDrop}>
                    {ships.map((element, index) => element.status === 'Table' ?
                        <DragShip key={index} size={element.size} id={element.id} coords={element.coords}
                                  status={element.status} evalRightClick={evalRightClick}
                                  reversed={element.reversed}/> : null)}
                    <Info/>
                </DropDesk>
                <Bar setShips={setShips}>
                    {ships.map((element, index) => element.status === 'Bar' ?
                        <DragShip key={index} size={element.size} id={element.id}/> : null)}
                </Bar>
            </div>
            <Preview ships={ships}/>
            <div className='button-container'>
                <button className='start-button' onClick={onStart}>Начать игру</button>
            </div>

        </DndProvider>




    );
}


export default Dispose;
