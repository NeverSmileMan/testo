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
    '@global': {
        'html, body': {
            fontSize: '18px',
            fontFamily: 'Roboto',
            margin: '0',
        },
        '*': {
            boxSizing: 'border-box',
        },
        '& div:-webkit-scrollbar': {
            width: '2.2rem',
        },
        '& div:-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 0.3rem #e4e4e4',
        },
        '& div:-webkit-scrollbar-thumb': {
            background: 'white',
            borderRadius: '0 1rem 1rem 0',
            border: '1px solid ' +  theme.palette.secondary.dark,
            borderLeft: 'none' ,
        },
    },
    'test_wrapper': {
        width: 1366 + 10 + 'px',
        height: 768 + 10 + 'px',
        background: 'grey',
        padding: '10px',
    },
    'main': {
        height: '100%',
        background: 'white',
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
}));

function Main({ classes }: WithStyles ) {
    return (
        <div className={classes.test_wrapper}>
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
        </div>
    );
}

export default withStyles(styles)(Main);
