import React, { useCallback } from 'react';
import { KeyboardBtn } from '../keyboard.btn/keyboard.btn';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { useStyle } from './fixed.btn.style';

interface Prop {
  strNumber: Array<number>;
  borderColor?: string;
  units?: string;
  modalClose: () => any;
  submitValueCalc: (num: number) => void;
}
export const FixedBtn = ({ strNumber, units, modalClose, submitValueCalc }: Prop) => {
  const cls = useStyle();
  const theme = useTheme<Theme>();

  const submitWeight = useCallback((val: number) => {
    submitValueCalc(val);
    modalClose();
  }, [modalClose, submitValueCalc]);

  return (
    <div className={cls.btnContainer}>
      {strNumber.map((val) => (
        <KeyboardBtn
          onClick={() => submitWeight(val)}
          key={val}
          // btnName={<>{val} {units}</>}
          borderColor={theme.palette.primary.main}
        >
          {`${val} ${units}`}
        </KeyboardBtn>
        ))}
    </div>
  )
}
