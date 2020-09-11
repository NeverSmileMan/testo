import React from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles,
} from '@material-ui/core/styles';
import WeightsDisplay from './WeightsDisplay';

const styles = createStyles((theme: Theme) => ({
    'weights': {
        backgroundColor: '#e4e4e4',
    }
}));

interface Props {
    containerClassName: string;
}

function Weights({ containerClassName, classes }: Props & WithStyles ) {

    const className = `${containerClassName} ${classes.weights}`;

    return (
        <div className={className}>
            <WeightsDisplay />
        </div>
    );
}

export default withStyles(styles)(Weights);
