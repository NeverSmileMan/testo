import React from 'react';
import WeightBtn from './weight.btn';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import KeyboardObject from '../../../data.structure/Keyboard';

const keyboard = KeyboardObject.getInstance();

const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const keyElem: HTMLElement | null = target.closest('[data-key]');
    const key = keyElem?.dataset['key'];
    if (key) {
        keyboard.onClick('CLEAR');
        keyboard.onClick(key);
        keyboard.onClick('ENTER');
    }
};

const useStyle = makeStyles({
  btnConteiner: {
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
  strWeight?: number;
  step?: number;
  countButton?: number;
  borderColor?: string;
}
const initialWeight = 4;
const initStep = 2;
const countBtn = 9;
const FixedWeight = ({ strWeight = initialWeight, step = initStep, countButton = countBtn }: Prop) => {
  const enumBtns = new Array(countButton).fill(null);
  const cls = useStyle();
  const theme = useTheme();
  return (
    <div className={cls.btnConteiner} onClick={onClick}>
      {enumBtns.map((val, index) => (<WeightBtn key={index} btnKey={`${strWeight + index * step}`} btnName={`${(strWeight + index * step)} гр.`} borderColor={theme.palette.primary.main} />))}
    </div>
  )
}

export default FixedWeight;
