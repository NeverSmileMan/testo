import React, { useContext } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderInfo';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';    
import { OprderControlContext } from './OrderControl';

type Props = {
    onClick: () => void;
} & WithStyles;

function OrderInfo({ classes, onClick }: Props) {
    
    const { isSelected, total }= useContext(OprderControlContext);

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
