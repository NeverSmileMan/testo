import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Input from './Input';

const useStyles = makeStyles({
    'search': {
        position: 'relative',
        width: '800px',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

function Search() {
    const classes = useStyles();

    return (
        <div className={`${classes.search}`}>
            <Input />
        </div>
    );
}

export default Search;
