import React, { useState, useEffect, createContext, useContext } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderControl';
import OrdersControl from '../../data.structure/OrdersControlNew';
import { Mode, State } from '../../data.structure/types/types';
import ModalService from '../../data.structure/ModalService';
import OrderInfo from './OrderInfo';
import Search from '../search/Search';
import OrderItems from './OrderItems';
import OrderControlModal from './OrderControlModal';
import { IOrdersControl } from '../../data.structure/OrdersControl';
import { IItem, IItemAmount } from '../../data.structure/Item';
import { OrdersControlContext } from '../Orders';
import { OrderControlContext } from '../Orders';

const orderControl = OrdersControl.getInstance();
const modalService = ModalService.getInstance();

interface IState {
    isSelected: boolean,
    total: string,
    orderItems: IItemAmount[],
    selectedItemIndex: number | null,
}

const getState = (): IState => ({
    isSelected: orderControl.isSelected(),
    total: orderControl.getTotal().toFixed(2),
    orderItems: orderControl.getItems(),
    selectedItemIndex: orderControl.getSelectedItemIndex(),
});

// export const OprderControlContext = createContext(getState());

const getMode = () => orderControl.getState() === State.PENDING ? Mode.MODAL : null;

let setState: React.Dispatch<(state: IState) => IState>;
let state: IState;

function changeState() {
    orderControl.onChange(() => setState(getState));
    return getState();
}

function showModal(mode: Mode | null) {
    if (mode === Mode.MODAL)
        modalService.showModal(<OrderControlModal />);
    else modalService.showModal(null);
}

type Props = {
    //value: { ordersControl: IOrdersControl };
    callbacks: {
        delItem: () => void,
        addItem: (item: IItem) => void,
        selectItem: (index: number | null) => void,
    };
} & WithStyles;

function OrderControl({ classes, callbacks }: Props) {
    [state, setState] = useState(changeState);
    
    const { order } = useContext(OrdersControlContext);
    const { orderMode } = useContext(OrderControlContext);
    // useEffect(() => {
    //     setState((state) => {
    //         if (!order) return state;
    //         order && orderControl.setOrder(order);
    //         return { ...state };
    //     });
    // }, [order]);

    // const mode = getMode();
    useEffect(() => showModal(orderMode), [orderMode]);

    if (!order) return null;

    return (
        // <OprderControlContext.Provider value={state}>
            <div className={classes.wrapper}>
                <div className='search-panel'>
                    <Search onSelect={callbacks.addItem} />
                    <OrderInfo onClick={callbacks.delItem} />
                </div>
                <div className='order-items'>
                    <OrderItems onSelect={callbacks.selectItem} />
                </div>
            </div>
        // </OprderControlContext.Provider>
    );
}

export default withStyles(styles)(OrderControl);
