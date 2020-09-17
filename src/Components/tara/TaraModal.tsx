import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/TaraModal';
import TaraDisplay from './TaraDisplay';
import KeyboardTara from './KeyboardTara';
import KeyboardTaraFix from './KeyboardTaraFix';
import { ITaraButton } from '../../data.structure/TaraButton';

type Props = {
    button: ITaraButton;
} & WithStyles;

function TaraModal ({ classes, button }: Props) {
    const { setAdditionalTara } = button;
    return (
        <div className={classes.wrapper}>
            <div className='display'>
                <TaraDisplay onSelect={setAdditionalTara}/>
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
