import React, { FC } from 'react';
import {useStyles} from './keyboard.btn.style';
import {Prop} from './keyboard.btn.interface';

export const KeyboardBtn: FC<Prop> = ({
    children,
    borderColor, 
    textColor = '#000', 
    colorBtn = '#e4e4e4', 
    nameClass, 
    onClick,
}) => {
    const cls: Record<string, string> = useStyles({ borderColor, colorBtn, textColor });
    const namedClass = nameClass && cls[nameClass]
        ? `${cls.btn} ${cls[nameClass]}`
        : `${cls.btn}`
        
    return (
        <button onClick={onClick} className={namedClass}>{children}</button>
    )
}
