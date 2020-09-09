import React, { useState } from 'react';
import TabControl from '../data.structure/TabControl';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme: Theme) => ({
    'order-info': {
        flex: '1 0 0',
        backgroundColor: theme.palette.primary.main,
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
        textAlign: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',     
        backgroundColor: 'white',
        borderRadius: '100px',
        color: theme.palette.primary.main,
        minWidth: '100px',
        fontWeight: 'bold',
        verticalAlign: 'middle',
    }
}));

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
