import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme: Theme) => ({
    'order-info': {
        backgroundColor: theme.palette.primary.main,
        flex: '1 0 0',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    'delete-icon': {
        width: '30px',
        height: '30px',
        borderRadius: '100px',
        backgroundColor: 'white',
        color: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
    },
    'total': {
        fontWeight: 'bold',
        textAlign: 'center',
        verticalAlign: 'middle',
        paddingLeft: '20px',
        paddingRight: '20px',     
        backgroundColor: 'white',
        borderRadius: '100px',
        color: 'rgb(0, 153, 255)',
        minWidth: '100px',
    }
}));

function OrderInfo() {
    const classes = useStyles();
    const [state, setState] = useState(true);
    
    return (
        <div className={classes['order-info']} onClick={() => setState(state => !state)}>
            {state ?

                <div className={classes['delete-icon']}>
                    <DeleteForeverIcon />
                </div> :

                <div className={classes.total}>
                    100,00
                </div>
            }
        </div>
    );
}

export default OrderInfo;
