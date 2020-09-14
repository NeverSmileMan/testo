import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Main';
import WeightsDisplay from './weights/WeightsDisplay';
import Orders from './Orders';
import Keyboard from './keyboard/KeyboardMain';
// import Modal from './Modal';

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
                <div id='modal-root'></div>
                {/* <Modal /> */}
            </div>
        </div>
    );
}

export default withStyles(styles)(Main);
