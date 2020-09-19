import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/Search';
// import { IItem } from '../data/Item';
import { IItem } from '../data/items';
import useSearch from '../hooks/Search';
import List from './List';

export type Props = {
    callbacks: {
        onSelect?: (item: IItem) => void;
        resetSearch?: (callback: () => void) => void;
    };
} & WithStyles;

function Search({ classes, callbacks }: Props) {

    const {
        isFocus, value, ref,
        onListSelect,
    } = useSearch(callbacks);

    return (
        <div className={classes.wrapper}>
            <div ref={ref}
                className={`input ${isFocus ? 'focus' : ''}`}>
            </div>
            <List filter={value} onSelect={onListSelect}/>
        </div>
    );
}

export default withStyles(styles)(Search);

// import itemsData, { IItem } from './itemsData';
// import { MainContext } from '../../main';
// const { addItem, setType, setSelectedItem } = useContext(MainContext);