import React, { useContext, useEffect } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderControl';
import { Mode } from '../../data.structure/types/types';
import { IItem } from '../../data.structure/Item';
import Search from '../search/Search';
import OrderInfo from './OrderInfo';
import OrderItems from './OrderItems';
import Modal from '../Modal';
import OrderControlModal from './OrderControlModal';
import { OrdersControlContext } from '../Orders';
import { OrderControlContext } from '../Orders';
import { WeightsContext } from '../Main'

type Props = {
    callbacks: {
        delItem: () => void,
        addItem: (item: IItem) => void,
        selectItem: (index: number | null) => void,
    };
} & WithStyles;

function OrderControl({ classes, callbacks }: Props) {
    
    const { order } = useContext(OrdersControlContext);
    const { orderMode, onWeightsChange } = useContext(OrderControlContext);
    const stateWeights = useContext(WeightsContext);

    useEffect(() => {
        onWeightsChange(stateWeights);
    }, [onWeightsChange, stateWeights]);

    if (!order) return null;
    return (<>
        <div className={classes.wrapper}>
            <div className='search-panel'>
                <Search onSelect={callbacks.addItem} />
                <OrderInfo onClick={callbacks.delItem} />
            </div>
            <div className='order-items'>
                <OrderItems onSelect={callbacks.selectItem} />
            </div>
        </div>
        {orderMode === Mode.MODAL ?
        <Modal>
            <OrderControlModal />
        </Modal> : null
        }
    </>);
}

export default withStyles(styles)(OrderControl);
