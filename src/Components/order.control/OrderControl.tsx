import React, { createContext, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderControl';
import { Mode } from '../../data.structure/types/types';
import { IItem } from '../../data.structure/Item';
import { IStateOrder } from '../../data.structure/OrderControl';
import { IOrderControl } from '../../data.structure/OrderControl';
import Search from '../search/Search';
import OrderInfo from './OrderInfo';
import OrderItems from './OrderItems';
import Modal from '../Modal';
import OrderControlModal from './OrderControlModal';

export const OrderControlContext = createContext<IStateOrder>({} as IStateOrder);

const createCallbacks = (orders: IOrderControl) => {
    const callbacksOrder = {
        delItem: () => orders.delItem(),
        addItem: (item: IItem) => orders.addItem(item),
        selectItem: (index: number | null) => orders.selectItem(index),
        onReset: (callback: () => void) => orders.onReset(callback),
    };
    return callbacksOrder;
}

const changeStateOrder = (
    object: IOrderControl,
    setStateOrder: React.Dispatch<() => IStateOrder>,
) => {
    object.onChangeOrder(setStateOrder);
};

type Props = {
    orders: IOrderControl;
} & WithStyles;

const useOrder = (orders: IOrderControl) => {
    const [{
        addItem, delItem,
        selectItem, onReset }] = useState(() => createCallbacks(orders));
    const [stateOrder, setStateOrder] = useState(orders.getStateOrder);
    useState(() => changeStateOrder(orders, setStateOrder));
    const { order, orderMode } = stateOrder;
    return { order, orderMode, stateOrder, addItem, delItem, selectItem, onReset};
};

function OrderControl({ classes, orders }: Props) {
    const {
        order, orderMode, stateOrder,
        addItem, delItem, selectItem, onReset,
    } = useOrder(orders);

    if (!order) return null;
    
    return (<>
        <OrderControlContext.Provider value = {stateOrder}>
            <div className={classes.wrapper}>
                <div className='search-panel'>
                    <Search callbacks={{ onSelect: addItem, resetSearch: onReset }}/>
                    <OrderInfo onClick={delItem} />
                </div>
                <div className='order-items'>
                    <OrderItems onSelect={selectItem} />
                </div>
            </div>
        </OrderControlContext.Provider>
        {orderMode === Mode.MODAL ?
        <Modal>
            <OrderControlModal />
        </Modal> : null
        }
    </>);
}

export default withStyles(styles)(OrderControl);
