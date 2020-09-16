import React, { useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/TaraModal';
import TaraDisplay from './TaraDisplay';
import KeyboardTara from './KeyboardTara';
import KeyboardTaraFix from './KeyboardTaraFix';
import { ITaraButton } from '../../data.structure/TaraButton';

type Props = {
    object: ITaraButton;
} & WithStyles;

function TaraModal ({ classes, object }: Props) {
    const onTaraSelect = useCallback(object.setAdditionalTara, [object]);
    return (
        <div className={classes.wrapper}>
            <div className='display'>
                <TaraDisplay onSelect={onTaraSelect}/>
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
