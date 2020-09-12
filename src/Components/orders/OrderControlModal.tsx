import React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

const styles = createStyles((theme: Theme) => ({
    title: {
        display: 'flex',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '40px',
    }
}));

interface Prop {
    title?: string;
}

function OrderControlModal({
    title = 'Зніміть товар з вагів',
    classes,
}: Prop & WithStyles) {

    return (
        <div className={classes.title}>
            {title}
        </div>
    );
}

export default withStyles(styles)(OrderControlModal);
