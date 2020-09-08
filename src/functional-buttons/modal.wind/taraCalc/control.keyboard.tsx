import React from 'react';
import WeightBtn from './weight.btn';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    controlContainer: {
        display:'grid',
        gridTemplateColumns: '50px',
        gridTemplateRows: 'repeat(2, 105px)',
        gridRowGap: '10px',
        padding: '5px',
        fontSize: '50px',
    }
})
const control = [
    {
        icon: <span>&#8592;</span>,
        btnColor: 'rgb(0, 153, 255)'
    },
    {
        icon: <span>&#10003;</span>,
        btnColor: 'rgb(0, 185, 255)'
    }]
const ControlKeyboard = () => {
    const {controlContainer} = useStyle ()
    return (
        <div className={controlContainer}>
            {control.map((val, index) => (<WeightBtn
                key={index}
                btnName={val.icon}
                textColor='#fff'
                colorBtn={val.btnColor} />))}
        </div>
    )
}

export default ControlKeyboard;