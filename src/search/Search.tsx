import React from 'react';
import { makeStyles } from '@material-ui/styles';
import InputList from './InputList';

const useStyles = makeStyles({
    'search': {
        position: 'relative',
        backgroundColor: 'rgb(0, 153, 255)',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '17%',
        boxSizing: 'border-box',
    },
});

function Search() {
    const classes = useStyles();

    return (
        <div className={`${classes.search}`}>
            <InputList />
        </div>
    );
}

export default Search;
