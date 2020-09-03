import React from 'react';
import Weights from './Weights';
import Orders from './Orders';
import Keyboard from './Keyboard';
import AppState from '../data.structure/App';
import Modal from './Modal';

const app = AppState.getInstance();

function Main() {

    return (
        <div className='main'>
            <Weights />
            <Orders />
            <Keyboard />
            <Modal />
        </div>
    );
}

export default Main;
