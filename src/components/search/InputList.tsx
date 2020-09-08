import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from './List';

const useStyles = makeStyles({
    'input-list': {
        fontWeight: 'bold',
        verticalAlign: 'middle',
        backgroundColor: 'white',
        borderRadius: '100px',
        flex: '1 0 0',
        paddingLeft: '20px',
        '&:after': {
            content: "''",
            display: 'inline',
            paddingLeft: '2px',
            animationName: 'caret-animation',
            animationDuration: '1s',
            animationDelay: '0s',
            animationIterationCount: 'infinite',
        },
    },

});

function InputList() {
    const classes = useStyles();

    return (
        <>
            <div className={classes['input-list']}>
                {'input'}
            </div>
            <List />
        </>
    );
}

export default InputList;
