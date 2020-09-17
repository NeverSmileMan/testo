import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/KeyboardTara';
import { useKeyboardTara } from '../../hooks/KeyboardTara';

function KeyboardTara({ classes }: WithStyles) {
    const {
        onClick,
        KeyboardLayoutNUMS,
        KeyboardLayoutFUNC,
    } = useKeyboardTara();

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
