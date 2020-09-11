import React from 'react';
import WeightBtn from './weight.btn';
import { makeStyles } from '@material-ui/styles';

const numbers = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
const useStyle = makeStyles({
    numberKeyboard: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 70px)',
        gridTemplateRows: 'repeat(4, 51px)',
        gridGap: '5px',
        padding: '5px',

    },
    btn0: {
    gridColumnStart: '1',
    gridColumnEnd: '3'
}
})

const NumberKeyboard = () => {
    const { numberKeyboard } = useStyle()
    return (
        <div className={numberKeyboard}>
            {numbers.map((val,index) => {
                if (index===numbers.length-1) {
                    return (<WeightBtn nameClass={`btn${val}`} key={val} btnName={val}/>)
                }
                return (<WeightBtn key={val} btnName={val} />)
            })}
        </div>
    )
}
export default NumberKeyboard;