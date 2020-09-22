import React, { useCallback, useContext } from 'react';
import KeyboardBtn from './keyboard.btn';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { MainContext } from '../../../main/main'

const useStyle = makeStyles({
  btnContainer: {
    display: 'grid',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    gridTemplateColumns: 'repeat(3, 95px)',
    gridTemplateRows: 'repeat(3, 95px)',
    gridColumnGap: '15px',
    gridRowGap: '15px',
    padding: '15px',
  }
})
interface Prop {
  strNumber: number;
  step: number;
  countButton?: number;
  borderColor?: string;
  units?: string;
}
const FixedBtn = ({ strNumber, step, countButton, units }: Prop) => {
  const enumBtns = new Array(countButton).fill(null);
  const cls = useStyle();
  const theme = useTheme<Theme>();
  const btnValue = (index: number) => (strNumber + index * step);
  const textBtn = useCallback((index: number) => `${btnValue(index)}${units ? ` ${units}` : ``}`, [units]);
  const { submitValueCalc } = useContext(MainContext);
  const submitWeight = useCallback((val: number) => {
    submitValueCalc(btnValue(val));
  }, [submitValueCalc, btnValue]);
  return (
    <div className={cls.btnContainer}>
      {enumBtns.map((val, index) => (
        <KeyboardBtn
          onClick={() => submitWeight(index)}
          key={index}
          btnName={textBtn(index)}
          borderColor={theme.palette.primary.main}
        />))}
    </div>
  )
}

export default FixedBtn;