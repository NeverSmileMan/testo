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
        key: 'BACKSPACE',
        icon: <span>&#8592;</span>,
        btnColor: 'rgb(0, 153, 255)'
    },
    {
        key: 'ENTER',
        icon: <span>&#10003;</span>,
        btnColor: 'rgb(0, 185, 255)'
    }]
const ControlKeyboard = () => {
    const {controlContainer} = useStyle ()
    return (
        <div className={controlContainer} onClick={onClick}>
            {control.map((val, index) => (<WeightBtn
                btnKey={val.key}
                key={index}
                btnName={val.icon}
                textColor='#fff'
                colorBtn={val.btnColor} />))}
        </div>
    )
}

export default ControlKeyboard;