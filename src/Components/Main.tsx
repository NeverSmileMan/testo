import React from 'react';
import Weights from './Weights';
import Orders from './Orders';
import Keyboard from './Keyboard';
import AppState from '../data.structure/App';
import Modal from './Modal';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
    'main': {
        width: 1366 + 10 + 'px',
        height: 768 + 10 + 'px',
        border: '10px solid grey',
        position: 'relative',
        '& .weights': {
            height: '15.9%',
        },
        '& .orders': {
            height: '58.9%',
        },
        '& .keyboard': {
            height: '25.2%',
        },
    },
    '@global': {
        '*': {
            boxSizing: 'border-box',
        },
        '::-webkit-scrollbar': {
            width: '40px',
        },
        '::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px #e4e4e4',
        },
        '::-webkit-scrollbar-thumb': {
            background: '#fff',
            borderRadius: '10px',
        },
        // '#root': {
        //     width: '100%',
        //     height: '100%',
        // },
        // 'html, body': {
        //     width: '100%',
        //     height: '100%',
        //     margin: 0,
        //     padding: 0,
        //     fontFamily: 'Arial',
        //     fontSize: '24px',
        // },
    },
});

AppState.getInstance();

function Main() {
    const { main } = useStyle();

    return (
        <div className={main}>
            <Weights />
            <Orders />
            <Keyboard />
            <Modal />
        </div>
    );
}

export default Main;
