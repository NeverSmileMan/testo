import React, { useState } from 'react';
import TabControl from '../data.structure/TabControl';
import { makeStyles } from '@material-ui/styles';
import  from '@material-ui/icons/tresh'
const useStyles = makeStyles({
    'order-info': {
        backgroundColor: 'rgb(0, 153, 255)',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const tabControl = TabControl.getInstance();

const onClick = () => {
    tabControl.delItem();
};

function OrderInfo() {
    const classes = useStyles();
    const [, setState] = useState({});

    useState(() => {
        tabControl.on('stateChange', () =>
            setState({}))
    });

    const isSelected = tabControl.isSelected();
    const total = <div>TOTAL: {tabControl.getTotal()}</div>;

    return (
        <div className={`${classes['order-info']} order-info`}>
            {isSelected ? <div onClick={onClick}>DEL</div> : total}
        </div>
    );
}

export default OrderInfo;
