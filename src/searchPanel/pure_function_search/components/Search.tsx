import React, { Dispatch, SetStateAction } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Search';
import { IItem } from '../objects/items';
import useSearch from '../hooks/Search';
import List from './List';

export type Props = {
    callbacks?: {
        onSelect?: (item: IItem) => void;
        resetSearch?: (callback: () => void) => void;
    };
} & WithStyles;

function Search({ classes }: Props) {

    const {
        isFocus, value, ref,
        onListSelect,
    } = useSearch();

    return (
        <div className={classes.wrapper}>
            <div ref={ref}
                className={`input ${isFocus ? 'focus' : 'focus'}`}>
            </div>
            <List filter={value} onSelect={onListSelect}/>
        </div>
    );
}

export default withStyles(styles)(Search);
