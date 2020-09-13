import React from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        width: '12%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.secondary.dark,
    },
}));

function HomeButton({ classes }: WithStyles) {
    return (
        <div className={classes.wrapper}>
			<HomeIcon fontSize="large" />
        </div>
    );
}

export default withStyles(styles)(HomeButton);
