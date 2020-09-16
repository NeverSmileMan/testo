import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/keyboard/KeyboardMain';
import useKeyboardMain, { keyboardOnClick } from '../../hooks/KeyboardMain';
import { 
    KeyboardLayoutOptionsEN,
    KeyboardLayoutOptionsUA,
    KeyboardLayoutOptionsNUMS,
} from './KeyboardOptions';
import KeyboardLayout from './KeyboardLayout';

const KeyboardLayoutUA = KeyboardLayout({ options: KeyboardLayoutOptionsUA });
const KeyboardLayoutEN = KeyboardLayout({ options: KeyboardLayoutOptionsEN });
const KeyboardLayoutNUMS = KeyboardLayout({ options: KeyboardLayoutOptionsNUMS });

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
