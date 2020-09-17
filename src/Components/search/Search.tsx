import React, { useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/Search';
import { IItem } from '../../data.structure/Item';
import useSearch from '../../hooks/Search';
import List from './List';

export type Props = {
    callbacks: {
        onSelect: (item: IItem) => void;
        resetSearch: (callback: () => void) => void;
    };
} & WithStyles;

function Search({ classes, callbacks }: Props) {

    const {
        isFocus, value, valueHTML, ref,
        onListSelect, attachInput, refreshInput
    } = useSearch(callbacks);
    
    useEffect(attachInput, [attachInput]);
    useEffect(() => refreshInput(valueHTML), [refreshInput, valueHTML]);

    return (
        <div className={classes.wrapper}>
            <div ref={ref}
                className={`input ${isFocus ? 'focus' : ''}`}>&nbsp;
            </div>
            <List filter={value} onSelect={onListSelect}/>
        </div>
    );
}

export default withStyles(styles)(Search);
