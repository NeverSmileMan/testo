import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './Search.styles';
import { IItem } from '../../data/Item';
import useSearch from './Search.hook';
import List from '../list/List';

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
