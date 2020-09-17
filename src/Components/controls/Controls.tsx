import React, { useContext } from 'react';
import Buttons from './ControlButtons';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/controls/Controls';
import { OrdersControlContext } from '../Orders';

type Props = {
    callbacks: {
        deleteOrder: () => void;
        printOrder: () => void;
    }
} & WithStyles;

function Controls({ classes, callbacks }: Props) {
    const { printIsActive, closeIsActive, doClose } = useContext(OrdersControlContext);
    return (
        <div className={classes.wrapper}>
            <Buttons.TaraButton />
            <Buttons.PrintButton isActive={printIsActive} onAction={callbacks.printOrder}/>
            <Buttons.CloseButton isActive={closeIsActive} onAction={callbacks.deleteOrder} doAction={doClose}/>
        </div>
    );
}

export default withStyles(styles)(Controls);
