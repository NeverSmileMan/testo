import React from 'react';
import WeightBtn from './weight.btn';
import { makeStyles } from '@material-ui/styles';

import KeyboardObject from '../../../data.structure/Keyboard';
// import KeyboardLayoutNUMS from './KeyboardLayoutNUMS';
// import KeyboardLayoutFUNC from './KeyboardLayoutFUNC';

const keyboard = KeyboardObject.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    key && keyboard.onClick(key);
};

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
    console.log(numbers.reverse())
    return (
        <div className={numberKeyboard} onClick={onClick}>
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
