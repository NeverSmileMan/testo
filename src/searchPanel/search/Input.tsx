import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from './List';
import './caret.css';

const useStyles = makeStyles({
    'input': {
        fontWeight: 'bold',
        verticalAlign: 'middle',
        backgroundColor: 'white',
        borderRadius: '100px',
        flex: '1 0 0',
        paddingLeft: '20px',
        paddingRight: '20px',
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
    const [state, setState] = useState(true);
    return (
        <>
            <div className={classes.input} onClick={() => setState(state => !state)}>
                {'input'}
            </div>
            {state ? <List /> : null}
        </>
    );
}

export default InputList;
