import React from 'react';
import Weights from './Weights';
import Orders from './Orders';
import Keyboard from './Keyboard';
import AppState from '../data.structure/App';
import Modal from './Modal';

const app = AppState.getInstance();

const style: React.CSSProperties = {
    height: '848px',
    width: '1020px',
}

function Main() {

    console.log("MAIN");

    return (
        <div className='main' style={style}>
            <Weights />
            <Orders />
            <Keyboard />
            <Modal />
        </div>
    );
}

export default Main;
