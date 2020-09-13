import React, { useState } from 'react';
import {
    createStyles, Theme,
    withStyles, WithStyles } from '@material-ui/core/styles';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';    
import OrderControl from '../../data.structure/OrderControl';

const styles = createStyles((theme: Theme) => ({
    'wrapper': {
        flex: '1 0 0',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& .delete': {
            width: '2rem',
            height: '2rem',
            borderRadius: '100px',
            background: 'white',
            color: theme.palette.error.main,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
        },
        '& .total': {
            textAlign: 'center',
            paddingLeft: '20px',
            paddingRight: '20px',     
            backgroundColor: 'white',
            borderRadius: '100px',
            color: theme.palette.primary.main,
            minWidth: '100px',
            fontWeight: 'bold',
            fontSize: '1.2rem',
        }
    },
}));

const orderControl = OrderControl.getInstance();

const onClick = () => orderControl.delItem();

const getState = () => ({
    isSelected: orderControl.isSelected(),
    total: orderControl.getTotal().toFixed(2),
});

let setState: React.Dispatch<{}>;

const changeState = () => {
    orderControl.onChange(() =>
        setState({})
    );
    return {};
};

function OrderInfo({ classes }: WithStyles) {
    [, setState] = useState(changeState);

    const { isSelected, total } = getState();

    return (
        <div className={classes.wrapper}>
            {isSelected ?
                <div className='delete' onClick={onClick}>
                    <DeleteForeverIcon />
                </div> :
                <div className='total'>
                    <span>{total}</span>
                </div>
            }
        </div>
    );
}

export default withStyles(styles)(OrderInfo);
