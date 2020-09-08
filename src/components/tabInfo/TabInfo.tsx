import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'info': {
        position: 'relative',
        backgroundColor: 'rgb(0, 153, 255)',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
});

function Search() {
    const classes = useStyles();

    return (
        <div className={`${classes.info}`}>

        </div>
    );
}

export default Search;