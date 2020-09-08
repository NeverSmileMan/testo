import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import List from './List';

const useStyles = makeStyles({
    input: {
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
            animation: '$cursor 1100ms infinite',
            width: '2px',
            height: '100%',
            background: 'black',
            opacity: 0,
        }
    },
    '@keyframes cursor': {
        '0%': {opacity: 0},
        '50%': {opacity: 1},
        '100%': {opacity: 0},
    },
});

function InputList() {
    const classes = useStyles();
    const [state, setState] = useState(true);
    return (
        <>
            <div className={classes.input} onClick={() => setState(state => !state)}>
                {/*{'input'}*/}
            </div>
            {state ? <List /> : null}
        </>
    );
}

export default InputList;
