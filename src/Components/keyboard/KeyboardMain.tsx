import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/keyboard/KeyboardMain';
import useKeyboardMain from '../../hooks/KeyboardMain';

function KeyboardMain({ classes }: WithStyles ) {
    const {
        lang,
        KeyboardLayoutEN,
        KeyboardLayoutUA,
        KeyboardLayoutNUMS,
        KeyboardLayoutFUNC,
        onClick,
    } =  useKeyboardMain();

    return (
        <div className={classes.wrapper} onClick={onClick}>
            <div className='letters'>
                {lang === 'UA' && <KeyboardLayoutUA />}
                {lang === 'EN' && <KeyboardLayoutEN />}
            </div>
            <div className='nums'>
                <KeyboardLayoutNUMS />
            </div>
            <div className='func'>
                <KeyboardLayoutFUNC />
            </div>
        </div>
    );
}

export default withStyles(styles)(KeyboardMain);
