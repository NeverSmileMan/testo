import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/KeyboardTaraFix';
import { useKeyboardTaraFix } from '../../hooks/KeyboardTara';

function KeyboardTaraFix({ classes }: WithStyles) {
    const {
        onClick,
        KeyboardLayoutTaraFIX,
    } = useKeyboardTaraFix();
    
    return (
        <div className={classes.wrapper} onClick={onClick}>
            <KeyboardLayoutTaraFIX />
        </div>
    );
}

export default withStyles(styles)(KeyboardTaraFix);
