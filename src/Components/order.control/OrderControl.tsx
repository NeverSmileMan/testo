import React, { createContext, useState } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderControl';
import { Mode } from '../../data.structure/types/types';
import { IItem } from '../../data.structure/Item';
import { IStateOrder } from '../../data.structure/OrderControl';
import { IOrdersControl } from '../../data.structure/OrdersControl';
import Search from '../search/Search';
import OrderInfo from './OrderInfo';
import OrderItems from './OrderItems';
import Modal from '../Modal';
import OrderControlModal from './OrderControlModal';

export const OrderControlContext = createContext<IStateOrder>({} as IStateOrder);

function createCallbacks(object: IOrdersControl) {
    const callbacksOrder = {
        delItem: () => object.delItem(),
        addItem: (item: IItem) => object.addItem(item),
        selectItem: (index: number | null) => object.selectItem(index),
        onReset: (callback: () => void) => object.onReset(callback),
    };
    return callbacksOrder;
}

let setStateOrder: React.Dispatch<() => IStateOrder>;
let stateOrder: IStateOrder;
function changeStateOrder(object: IOrdersControl) {
    object.onChangeOrder(() => setStateOrder(object.getStateOrder));
    return object.getStateOrder();
}

type Props = {
    object: IOrdersControl;
} & WithStyles;

function OrderControl({ classes, object }: Props) {
    const [{
        addItem, delItem,
        selectItem, onReset }] = useState(() => createCallbacks(object));
    [stateOrder, setStateOrder] = useState<IStateOrder>(() => changeStateOrder(object));
    const { order, orderMode } = stateOrder;

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
