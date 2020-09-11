import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    title: {
        display: 'flex',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '40px',
    }
})
interface Prop {
    title?: string;
}
const titlePrint: string = 'Зніміть товар з вагів';

function OrderControlModal({ title = titlePrint }: Prop) {
    const cls = useStyles();
    return (
        // <div
        //     className='order-control modal'>
        //     TAB CONTROL MODAL
        // </div>
        <div className={cls.title}>{title}</div>
    );
}

export default OrderControlModal;
