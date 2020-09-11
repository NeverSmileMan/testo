import React from 'react';
import WeightBtn from './weight.btn';
import ControlKeyboard from './control.keyboard';
import NumberKeyboard from './numder.keyboard';
import { makeStyles } from '@material-ui/styles';

const useStyle = makeStyles({
    keyboardConteiner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    }
})
const KeyboardInput = () => {
    const {keyboardConteiner} = useStyle()
    return (
        <div className={keyboardConteiner}>
            <NumberKeyboard />
            <ControlKeyboard />
        </div>
    )
}

export default KeyboardInput;