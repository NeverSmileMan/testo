import React, { useCallback } from 'react';
import { Button } from '../../keyboard/button/button'
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { useStyle } from './fixed.btn.style';
import { styles } from '../../homeButton/HomeButton.styles';

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

  const submitWeight = (val: number): void => {
    submitValueCalc(val);
    modalClose();
  };
  const styles = {
    fontSize:'0.8em',
    textTransform:'none',
    border:theme.palette.primary.main,
  }

  return (
    <div className={cls.btnContainer}>
      {strNumber.map((val) => (
        <Button
          onClick={() => submitWeight(val)}
          key={val}
          className={''}
          styles={styles}
        >
          {`${val} ${units}`}
        </Button>
      ))}
    </div>
  )
}
