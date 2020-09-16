import React, { useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tara/TaraDisplay';
import useTaraDisplay, { attachInput, refreshInput } from '../../hooks/TaraDisplay';

type Props = {
    onSelect: (value: number) => void;
} & WithStyles;

function TaraDisplay({ classes, onSelect }: Props) {

    const { isFocus, valueHTML, input, ref } = useTaraDisplay(onSelect);

    useEffect(() => attachInput(input), [input]);
    useEffect(() => refreshInput(ref, valueHTML), [ref, valueHTML]);
    
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
