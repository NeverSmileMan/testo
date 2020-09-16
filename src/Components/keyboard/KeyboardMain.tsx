import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/keyboard/KeyboardMain';
import 
    useKeyboardMain, {
    keyboardOnClick,
    KeyboardLayoutEN,
    KeyboardLayoutUA,
    KeyboardLayoutNUMS,
} from '../../hooks/KeyboardMain';

function KeyboardMain({ classes }: WithStyles ) {
    const { lang, KeyboardLayoutFUNC } =  useKeyboardMain();
    return (
        <div className={classes.wrapper} onClick={keyboardOnClick}>
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
