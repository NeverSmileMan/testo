import React, { createContext } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderControl';
import { Mode } from '../../data.structure/types/types';
import { IStateOrder } from '../../data.structure/OrderControl';
import { IOrderControl } from '../../data.structure/OrderControl';
import useOrder from '../../hooks/OrderControl';
import Search from '../search/Search';
import OrderInfo from './OrderInfo';
import OrderItems from './OrderItems';
import Modal from '../Modal';
import OrderControlModal from './OrderControlModal';

export const OrderControlContext = createContext<IStateOrder>({} as IStateOrder);

type Props = {
    orders: IOrderControl;
} & WithStyles;

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
