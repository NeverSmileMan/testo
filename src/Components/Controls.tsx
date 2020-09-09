import React from 'react';
import TaraButton from './TaraButton';
import PrintButton from './PrintButton';
import CloseButton from './CloseButton';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    controls: {
        width: '8%',
        display: 'flex',
        flexDirection: 'column',
    },
});

function Controls() {
    const classes = useStyles();

    return (
        <div className={`${classes.controls} controls`}>
            <TaraButton />
            <PrintButton />
            <CloseButton />
        </div>
    );
}

export default Controls;
