import React from 'react';
import Buttons from './ControlButtons';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    controls: {
        width: '8%',
        display: 'flex',
        flexDirection: 'column',
    },
}));

function Controls({ classes }: WithStyles) {

    return (
        <div className={`${classes.controls} controls`}>
            <Buttons.TaraButton />
            <Buttons.PrintButton />
            <Buttons.CloseButton />
        </div>
    );
}

export default withStyles(styles)(Controls);
