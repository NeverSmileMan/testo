import React, { useCallback } from 'react';
import WeightBtn from './weight.btn';
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
    onClick: (num: number) => {},

}
const NumberKeyboard = ({ onClick }: Prop) => {
    const { numberKeyboard } = useStyle();
    const setWeight = useCallback((val: number): any => () => onClick(val), [onClick]);
    // const deleteWeight = useCallback(())
    return (
        <div className={numberKeyboard}>
            {numbers.map((val, index) => {
                if (index === numbers.length - 1) {
                    return (<WeightBtn onClick={() => onClick(val)} nameClass={`btn${val}`} key={val} btnName={val} />)
                }
                return (<WeightBtn onClick={setWeight(val)} key={val} btnName={val} />)
            })}
        </div>
    )
}
export default NumberKeyboard;