import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Main';
import WeightsDisplay from './weights/WeightsDisplay';
import Orders from './Orders';
import KeyboardMain from './keyboard/KeyboardMain';

type Props = {
    maxOrdersCount: number;
} & WithStyles;

function Main({ classes, maxOrdersCount }: Props ) {
    return (
        <div className={classes.test_wrapper}>
            <div className={classes.wrapper}>
                <div className='weights'>
                    <WeightsDisplay />
                </div>
                <div className='orders'>
                    <Orders maxOrdersCount={maxOrdersCount} />
                </div>
                <div className='keyboard'>
                    <KeyboardMain />
                </div>
                <div id='modal-root'></div>
            </div>
        </div>
    );
}

export default withStyles(styles)(Main);
