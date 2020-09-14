import React, { useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderInfo';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';    
import OrderControl from '../../data.structure/OrderControl';

const orderControl = OrderControl.getInstance();

const onClick = () => orderControl.delItem();

const getState = () => ({
    isSelected: orderControl.isSelected(),
    total: orderControl.getTotal().toFixed(2),
});

let setState: React.Dispatch<{}>;

const changeState = () => {
    orderControl.onChange(() =>
        setState({})
    );
    return {};
};

function OrderInfo({ classes }: WithStyles) {
    [, setState] = useState(changeState);

    const { isSelected, total } = getState();

    return (
        <div className={classes.wrapper}>
            {isSelected ?
                <div className='delete' onClick={onClick}>
                    <DeleteForeverIcon />
                </div> :
                <div className='total'>
                    {total}
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(OrderInfo);
