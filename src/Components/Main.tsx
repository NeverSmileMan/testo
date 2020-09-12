import React from 'react';
import Weights from './weights/Weights';
import Orders from './Orders';
import Keyboard from './keyboard/KeyboardMain';
import Modal from './Modal';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    'main': {
        width: 1366 + 10 + 'px',
        height: 768 + 10 + 'px',
        border: '10px solid grey',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        '& .weights': {
            height: '16%',
        },
        '& .orders': {
            flex: '1 0 0',
        },
        '& .keyboard': {
            height: '25%',
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

function Main({ classes }: WithStyles ) {
    return (
        <div className={classes.main}>
            <div className='weights'>
                <Weights />
            </div>
            <div className='orders'>
                <Orders />
            </div>
            <div className='keyboard'>
                <Keyboard />
            </div>
            <Modal />
        </div>
    );
}

export default withStyles(styles)(Main);
