import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/tabs.panel/HomeButton';
import HomeIcon from '@material-ui/icons/Home';

function HomeButton({ classes }: WithStyles) {
    return (
        <div className={classes.wrapper}>
			<HomeIcon fontSize="large" />
        </div>
    );
}

export default withStyles(styles)(HomeButton);
