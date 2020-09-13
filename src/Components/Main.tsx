import React from 'react';
import WeightsDisplay from './weights/WeightsDisplay';
import Orders from './Orders';
import Keyboard from './keyboard/KeyboardMain';
import Modal from './Modal';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
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
                    <WeightsDisplay />
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
