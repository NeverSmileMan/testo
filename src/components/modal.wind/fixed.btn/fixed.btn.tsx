import React, { useCallback } from 'react';
import {Button} from '../../keyboard/button/button' 
// import { KeyboardBtn } from '../keyboard.btn/keyboard.btn';
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

  const submitWeight = (val: number):void => {
    submitValueCalc(val);
    modalClose();
  };

  return (
    <div className={cls.btnContainer}>
      {strNumber.map((val) => (
        <Button
          callback={submitWeight}
          value={val}
          key={val}
          className={''}
          fontSize={'0.8em'}
          textTransform='none'
          // btnName={<>{val} {units}</>}
          border={theme.palette.primary.main}
        >
          {`${val} ${units}`}
        </Button>
        ))}
    </div>
  )
}
