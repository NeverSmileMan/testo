import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../styles/OrderInfo';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';    
// import { OrderControlContext } from '../order.control/OrderControl';

type Props = {
    value: any;
    activeItem: any
    onClick: () => void;
} & WithStyles;

function OrderInfo({ classes, onClick }: Props) {
    
    // const { isSelected, total } = useContext(OrderControlContext);
    const { isSelected, total } = { isSelected: false, total: '123.45' };

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

// const calc = React.useCallback((data: string) => {
//     let w: any = [];
//     let x: any;
//     if (props.value.length) props.value.forEach((item: any) => w.push(item[data]));
//     if (props.value.length) x = w.reduce((acc: any, cur: any) => acc + cur);
//     return x;
// }, [props])