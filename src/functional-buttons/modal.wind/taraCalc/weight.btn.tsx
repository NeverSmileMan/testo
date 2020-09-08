import React from 'react';
import { } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    btn: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#e4e4e4',
        border: '1px solid rgb(0, 153, 255)',
        borderRadius: '10px',
        color:'#000',
        fontSize: '20px'
        
    }
})
interface Prop {
    btnName: number;
}
const WeightBtn = ({ btnName }: Prop) => {
    const cls = useStyles();
    return (
        <div className={cls.btn}>{btnName} гр.</div>
    )
}

export default WeightBtn;