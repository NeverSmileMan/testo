import React, { useState, useEffect } from 'react';
import OrderInfo from './OrderInfo';
import Search from './Search';
import OrderItems from './OrderItems';
import TabControl from '../data.structure/OrderControl';
import { Mode } from '../data.structure/types';
import ModalService from '../data.structure/ModalService';
import TabControlModal from './TabControlModal';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'order-control': {
        flex: '1 0 0',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'blue',
        position: 'relative',
        '& .search-panel': {
            //width: '100%',
            height: '17%',
            display: 'flex',
        },
    },
});

const tabControl = TabControl.getInstance();
const modalService = ModalService.getInstance();

function changeState(setState: React.Dispatch<() => Mode | null>) {
    tabControl.on('stateChange', () =>
        setState(() => tabControl.getMode())
    );
}

function showModal(mode: Mode | null) {
    if (mode === Mode.MODAL)
        modalService.showModal(<TabControlModal />);
    else modalService.showModal(null);
}

function OrderControl() {
    const classes = useStyles();
    const [mode, setState] = useState(null as any as Mode | null);
    
    useEffect(() => changeState(setState), []);
    
    useEffect(() => showModal(mode), [mode]);

    return (
        <div className={classes['order-control']}>
            <div className='search-panel'>
                <Search />
                <OrderInfo />
            </div>
            <OrderItems />
        </div>
    );
}

export default OrderControl;
