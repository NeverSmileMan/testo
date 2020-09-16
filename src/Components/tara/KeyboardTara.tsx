import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/KeyboardTara';
import {
    KeyboardLayoutNUMS,
    KeyboardLayoutFUNC,
    onClickTara as onClick,
} from '../../hooks/KeyboardTara';

function KeyboardTara({ classes }: WithStyles) {

    return (
        <div className={classes.wrapper} onClick={onClick}>
            <div className='nums'>
                <KeyboardLayoutNUMS />
            </div>
            <div className='func'>
                <KeyboardLayoutFUNC />
            </div>
        </div>
    );
}

export default withStyles(styles)(KeyboardTara);
