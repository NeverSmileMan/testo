import React from 'react';
import { useStyle } from './head.input.style';

interface Prop {
    inputValue: string | number;
    inputName: string;
    modalClose: () => any;
}

export const HeadInput = ({ inputName, inputValue, modalClose }: Prop) => {
    const { inputHead, head, input, weigh, closeBtn } = useStyle();

    return (
        <div className={inputHead}>
            <div className={head}>
                <div>{inputName}</div>
                <button onClick={modalClose} className={closeBtn}>&#10005;</button>
            </div>
            <div className={input}>
                <div className={weigh}>{inputValue}</div>
                <div></div>
            </div>
        </div>
    )
}
