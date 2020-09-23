import React from 'react';
import { useStyle } from './head.input.style';

interface Prop {
    inputValue: string | number;
    inputName: string;
    modalClose: () => any;
}

const HeadInput = ({ inputName, inputValue, modalClose }: Prop) => {
    const { inputHead, head, input, weigh } = useStyle();

    return (
        <div className={inputHead}>
            <div className={head}>
                <div>{inputName}</div>
                <div
                    onClick={modalClose}>
                    &#10005;
          </div>
            </div>
            <div className={input}>
                <div className={weigh}>{inputValue}</div>
                <div></div>
            </div>
        </div>
    )
}
export default HeadInput;