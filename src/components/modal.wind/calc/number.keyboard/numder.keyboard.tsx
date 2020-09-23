import React from 'react';
import KeyboardBtn from '../keyboard.btn/keyboard.btn';
import { useStyle } from './number.keyboard.style';

const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

interface Prop {
  onClick: (num: number) => any,
}

const NumberKeyboard = ({ onClick }: Prop) => {
  const { numberKeyboard } = useStyle();

  return (
    <div className={numberKeyboard}>
      {numbers.map((val) =>
        <KeyboardBtn
          onClick={onClick(val)}
          nameClass={val === 0 ? 'btn0' : ''}
          key={val} btnName={val}
        />
      )}
    </div>
  )
}
export default NumberKeyboard;