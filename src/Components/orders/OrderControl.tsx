import React, { useState, useEffect } from 'react';
import OrderInfo from './OrderInfo';
import Search from './../search/Search';
import OrderItems from './OrderItems';
import TabControl from '../../data.structure/OrderControl';
import { Mode, State } from '../../data.structure/types/types';
import ModalService from '../../data.structure/ModalService';
import OrderControlModal from './OrderControlModal';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

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

const tabControl = TabControl.getInstance();
const modalService = ModalService.getInstance();

function changeState(setState: React.Dispatch<() => Mode | null>) {
    tabControl.onChange(() =>
        setState(() => tabControl.getState() === State.PENDING ? Mode.MODAL : null)
    );
}

function showModal(mode: Mode | null) {
    if (mode === Mode.MODAL)
        modalService.showModal(<OrderControlModal />);
    else modalService.showModal(null);
}

function OrderControl({ classes }: WithStyles) {
    const [mode, setState] = useState(null as (Mode | null));
    
    useEffect(() => changeState(setState), []);
    
    useEffect(() => showModal(mode), [mode]);

    return (
        <div className={classes['wrapper']}>
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
