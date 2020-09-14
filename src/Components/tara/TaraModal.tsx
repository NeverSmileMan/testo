import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/TaraModal';
import TaraDisplay from './TaraDisplay';
import KeyboardTara from './KeyboardTara';
import KeyboardTaraFix from './KeyboardTaraFix';

function TaraModal ({ classes }: WithStyles) {
    return (
        <div className={classes.wrapper}>
            <div className='display'>
                <TaraDisplay />
            </div>
            <div className='keyboardTara'>
                <KeyboardTara />
            </div>
            <div className='keyboardTaraFix'>
                <KeyboardTaraFix />
            </div>
        </div>
    );
};

export default withStyles(styles)(TaraModal);
