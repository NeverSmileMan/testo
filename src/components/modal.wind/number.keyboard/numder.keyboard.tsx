import React from 'react';
import { KeyboardBtn } from '../keyboard.btn/keyboard.btn';
import { useStyle } from './number.keyboard.style';
import { numbers } from '../../../enum/enum.number.keyboard'

interface Prop {
  onClick: (num: number) => any,
}

export const NumberKeyboard = ({ onClick }: Prop) => {
  const { numberKeyboard } = useStyle();

  return (
    <div className={numberKeyboard}>
      {numbers.map((val) =>
        <KeyboardBtn
          onClick={onClick(val)}
          nameClass={val === 0 ? 'btn0' : ''}
          key={val} 
          // btnName={<>{val}</>}
        >
          {val}
        </KeyboardBtn>
      )}
    </div>
  )
}