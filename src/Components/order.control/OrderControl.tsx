import React, { useState, useEffect } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import OrderControlObject from '../../data.structure/OrderControl';
import { Mode, State } from '../../data.structure/types/types';
import ModalService from '../../data.structure/ModalService';
import OrderInfo from './OrderInfo';
import Search from '../search/Search';
import OrderItems from './OrderItems';
import OrderControlModal from './OrderControlModal';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '& .search-panel': {
            height: '17%',
            display: 'flex',
        },
        '& .order-items': {
            flex: '1 0 0',
        },
    },
}));

const orderControl = OrderControlObject.getInstance();
const modalService = ModalService.getInstance();

let setState: React.Dispatch<() => Mode | null>;
let mode: Mode | null;
function changeState() {
    const getMode = () => orderControl.getState() === State.PENDING ? Mode.MODAL : null;
    orderControl.onChange(() => setState(getMode));
    return getMode();
}

function showModal(mode: Mode | null) {
    if (mode === Mode.MODAL)
        modalService.showModal(<OrderControlModal />);
    else modalService.showModal(null);
}

function OrderControl({ classes }: WithStyles) {
    
    [mode, setState] = useState(changeState);
    
    useEffect(() => showModal(mode), [mode]);

    return (
        <div className={classes.wrapper}>
            <div className='search-panel'>
                <Search />
                <OrderInfo />
            </div>
            <div className='order-items'>
                <OrderItems />
            </div>
        </div>
    );
}

export default withStyles(styles)(OrderControl);
