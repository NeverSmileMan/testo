import React, { useState, useEffect, createContext, } from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from '../../styles/order.control/OrderControl';
import OrderControlObject, { IOrderControl } from '../../data.structure/OrderControl';
import { Mode, State } from '../../data.structure/types/types';
import ModalService from '../../data.structure/ModalService';
import OrderInfo from './OrderInfo';
import Search from '../search/Search';
import OrderItems from './OrderItems';
import OrderControlModal from './OrderControlModal';

const orderControl = OrderControlObject.getInstance();
const modalService = ModalService.getInstance();
export const OprderControlContext = createContext({ orderControl });
const getMode = () => orderControl.getState() === State.PENDING ? Mode.MODAL : null;

let setState: React.Dispatch<() => { orderControl: IOrderControl }>;
let state: { orderControl: IOrderControl };

function changeState() {
    orderControl.onChange(() => setState(() => ({ orderControl })));
    return { orderControl };
}

function showModal(mode: Mode | null) {
    if (mode === Mode.MODAL)
        modalService.showModal(<OrderControlModal />);
    else modalService.showModal(null);
}

function OrderControl({ classes }: WithStyles) {
    
    [state, setState] = useState(changeState);
    
    const mode = getMode();
    useEffect(() => showModal(mode), [mode]);

    return (
        <OprderControlContext.Provider value={state}>
            <div className={classes.wrapper}>
                <div className='search-panel'>
                    <OprderControlContext.Consumer>
                        {(value) => <Search value={value} />}
                    </OprderControlContext.Consumer>
                    <OprderControlContext.Consumer>
                        {(value) => <OrderInfo value={value} />}
                    </OprderControlContext.Consumer>
                </div>
                <div className='order-items'>
                    <OrderItems />
                </div>
            </div>
        </OprderControlContext.Provider>
    );
}

export default withStyles(styles)(OrderControl);
