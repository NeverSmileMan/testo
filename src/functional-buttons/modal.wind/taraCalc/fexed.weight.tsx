import React from 'react';
import WeightBtn from './weight.btn';
import { makeStyles } from '@material-ui/styles';

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
  return (
    <div className={cls.btnConteiner}>
      {enumBtns.map((val, index) => (<WeightBtn key={index} btnName={`${(strWeight + index * step)} гр.`} borderColor={'rgb(0, 153, 255)'} />))}
    </div>
  )
}

export default FixedWeight;