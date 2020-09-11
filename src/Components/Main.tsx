import React from 'react';
import Weights from './weights/Weights';
import Orders from './Orders';
import Keyboard from './keyboard/KeyboardMain';
import Modal from './Modal';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
        'html, body': {
            fontSize: '18px',
            fontFamily: 'Roboto',
        },
        '*': {
            boxSizing: 'border-box',
        },
        '::-webkit-scrollbar': {
            width: '2.2rem',
        },
        '::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 0.3rem #e4e4e4',
        },
        '::-webkit-scrollbar-thumb': {
            background: '#fff',
            borderRadius: '0 1rem 1rem 0',
            border: '1px solid gray',
            borderLeft: 'none' ,
        },
    },
}));

function Main() {

    const { main } = useStyles();

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
