import React, { useState } from 'react';
import TabControl from '../data.structure/TabControl';
import { makeStyles } from '@material-ui/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles({
    'order-info': {
        backgroundColor: 'rgb(0, 153, 255)',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    'delete-icon': {
        width: '30px',
        height: '30px',
        borderRadius: '100px',
        background: 'white',
        color: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    'total': {
        fontWeight: 'bold',
        verticalAlign: 'middle',
        paddingLeft: '10px',
        paddingRight: '10px',     
        backgroundColor: 'white',
        borderRadius: '100px',
        color: 'rgb(0, 153, 255)',
        minWidth: '100px',
    }
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
    const total = <span>{tabControl.getTotal().toFixed(2)}</span>;

    return (
        <div className={`${classes['order-info']} order-info`}>
            {isSelected ?
                <div onClick={onClick} className={classes['delete-icon']}>
                    <DeleteForeverIcon />
                </div> :
                <div className={classes.total}>
                    {total}
                </div>
            }
        </div>
    );
}

export default OrderInfo;
