import React, { useCallback } from 'react';
import KeyboardBtn from './keyboard.btn';
import { makeStyles } from '@material-ui/styles';

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
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

interface Prop {
    onClick: (num: number) => any,

}
const NumberKeyboard = ({ onClick }: Prop) => {
    const { numberKeyboard } = useStyle();
    
    return (
        <div className={numberKeyboard}>
            {numbers.map((val, index) => {
                if (index === numbers.length - 1) {
                    return (<KeyboardBtn onClick={onClick(val)} nameClass={`btn${val}`} key={val} btnName={val} />)
                }
                return (<KeyboardBtn onClick={onClick(val)} key={val} btnName={val} />)
            })}
        </div>
    )
}
export default NumberKeyboard;