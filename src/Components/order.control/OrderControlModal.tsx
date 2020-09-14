import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderControlModal';

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
