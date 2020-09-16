import React, { useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/search/Search';
import { IItem } from '../../data.structure/Item';
import useSearch, { attachInput, refreshInput } from '../../hooks/Search';
import List from './List';

export type Props = {
    callbacks: {
        onSelect: (item: IItem) => void;
        resetSearch: (callback: () => void) => void;
    };
} & WithStyles;

function Search({ classes, callbacks }: Props) {

    const { isFocus, value, valueHTML, input, ref, onListSelect } = useSearch(callbacks);
    
    useEffect(() => attachInput(input), [input]);
    useEffect(() => refreshInput(ref, valueHTML), [ref, valueHTML]);

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
