import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Input from './Input';

const useStyles = makeStyles((theme: Theme) => ({
    'search': {
        backgroundColor: theme.palette.primary.main,
        width: '70%',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
}));

function Search() {
    const classes = useStyles();

    return (
        <div className={`${classes.search}`}>
            <Input />
        </div>
    );
}

export default Search;
