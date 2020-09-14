import React, { useState, useEffect, createContext, useCallback } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderControl';
import OrderControlObject from '../../data.structure/OrderControl';
import { Mode, State } from '../../data.structure/types/types';
import ModalService from '../../data.structure/ModalService';
import OrderInfo from './OrderInfo';
import Search from '../search/Search';
import OrderItems from './OrderItems';
import OrderControlModal from './OrderControlModal';
import { IOrdersControl } from '../../data.structure/OrdersControl';
import { IItem, IItemAmount } from '../../data.structure/Item';

const orderControl = OrderControlObject.getInstance();
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

export const OprderControlContext = createContext(getState());

const getMode = () => orderControl.getState() === State.PENDING ? Mode.MODAL : null;
const delItem = () => orderControl.delItem();
const addItem = (item: IItem) => orderControl.addItem(item);
const selectItem = (index: number | null) => orderControl.selectItem(index);

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
    value: { ordersControl: IOrdersControl };
} & WithStyles;

function OrderControl({ classes, value }: Props) {
    [state, setState] = useState(changeState);
    
    const order = value.ordersControl.getCurrentOrder();

    useEffect(() => {
        setState((state) => {
            if (!order) return state;
            order && orderControl.setOrder(order);
            return { ...state };
        });
    }, [order]);

    const mode = getMode();
    useEffect(() => showModal(mode), [mode]);

    if (!order) return null;

    return (
        <OprderControlContext.Provider value={state}>
            <div className={classes.wrapper}>
                <div className='search-panel'>
                    <Search onSelect={addItem} />
                    <OrderInfo onClick={delItem} />
                </div>
                <div className='order-items'>
                    <OrderItems onSelect={selectItem} />
                </div>
            </div>
        </OprderControlContext.Provider>
    );
}

export default withStyles(styles)(OrderControl);
