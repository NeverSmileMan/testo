import React, { useContext } from 'react';
import Buttons from './ControlButtons';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { OrdersControlContext } from '../Orders';

const styles = createStyles((theme: Theme) => ({
    controls: {
        width: '8%',
        display: 'flex',
        flexDirection: 'column',
    },
}));

type Props = {
    deleteOrder: () => void;
    printOrder: () => void;
} & WithStyles;

function Controls({ classes, deleteOrder, printOrder }: Props) {
    const { printIsActive, closeIsActive } = useContext(OrdersControlContext);
    return (
        <div className={classes.controls}>
            <Buttons.TaraButton />
            <Buttons.PrintButton isActive={printIsActive} onAction={printOrder}/>
            <Buttons.CloseButton isActive={closeIsActive} onAction={deleteOrder}/>
        </div>
    );
}

export default withStyles(styles)(Controls);
