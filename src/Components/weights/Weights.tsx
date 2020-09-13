import React from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import WeightsDisplay from './WeightsDisplay';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        height: '100%',
    },
}));

function Weights({ classes }: WithStyles ) {
    return (
        <div className={classes.wrapper}>
            <WeightsDisplay />
        </div>
    );
}

export default withStyles(styles)(Weights);
