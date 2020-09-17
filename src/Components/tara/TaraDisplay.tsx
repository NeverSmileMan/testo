import React, { useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/TaraDisplay';
import useTaraDisplay from '../../hooks/TaraDisplay';

export type Props = {
    onSelect: (value: number) => void;
} & WithStyles;

function TaraDisplay({ classes, onSelect }: Props) {

    const {
        isFocus, valueHTML, ref,
        attachInput, refreshInput,
    } = useTaraDisplay(onSelect);

    useEffect(attachInput, [attachInput]);
    useEffect(() => refreshInput(valueHTML), [refreshInput, valueHTML]);
    
    return (
        <div className={classes.wrapper}>
            <div
                ref={ref}
                className={'input ' + (isFocus ? 'focus' : '')}>
            </div>
        </div>
    );
};

export default withStyles(styles)(TaraDisplay);
