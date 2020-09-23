import React from 'react';
import {useStyles} from './keyboard.btn.style';
import {Prop} from './keyboard.btn.interface';

const KeyboardBtn = ({
    btnName, 
    borderColor = 'none', 
    textColor = '#000', 
    colorBtn = '#e4e4e4', 
    nameClass, 
    onClick }: Prop) => {
    const cls: Record<string, string> = useStyles({ borderColor, colorBtn, textColor });
    const namedClass = nameClass && cls[nameClass]
        ? `${cls.btn} ${cls[nameClass]}`
        : `${cls.btn}`
        
    return (
        <div onClick={onClick} className={namedClass}>{btnName}</div>
    )
}

export default KeyboardBtn;