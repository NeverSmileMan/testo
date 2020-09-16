import React, { useState, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { MainContext } from '../../../main';
import NumberKeyboard from '../calc/numder.keyboard';
import ControlKeyboard from '../calc/control.keyboard';
import HeadInput from '../calc/head.input';


const useStyle = makeStyles({
  inputContainer: {
    width: '310px',
    marginRight: '12px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  keyboardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
})

const NameCalc = 'Кількість'

const InputQty = () => {
  const { inputContainer, keyboardContainer } = useStyle();
  const [qtyGoods, setqtyGoods] = useState(0)
  const {setCalcValue, setType} = useContext(MainContext);
  const getQty = useCallback((num: number): any => () => {
    setqtyGoods(qtyGoods * 10 + num)
  }, [setqtyGoods, qtyGoods])

  const deleteQty = useCallback(() => {
    setqtyGoods(Math.trunc(qtyGoods / 10))
  }, [setqtyGoods, qtyGoods])

  const submitQty = () => {
    console.log('heramba');
    setCalcValue(qtyGoods);
    setType(null)();
  };
  
  const controlOnclick = {
    delete: deleteQty,
    submit: submitQty,
  }
  return (
    <div className={inputContainer}>
      <HeadInput
        inputValue={qtyGoods}
        inputName={NameCalc} />
      <div className={keyboardContainer}>
        <NumberKeyboard onClick={getQty} />
        <ControlKeyboard onClick={controlOnclick} />
      </div>
    </div>
  )
}

export default InputQty;