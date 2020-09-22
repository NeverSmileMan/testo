import React, { useState, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { MainContext } from '../../../main/main';
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
  const { setType, selectedItem, addItem } = useContext(MainContext);
  const getQty = useCallback((num: number): any => () => {
    setqtyGoods(qtyGoods * 10 + num)
  }, [setqtyGoods, qtyGoods])

  const deleteQty = useCallback(() => {
    setqtyGoods(Math.trunc(qtyGoods / 10))
  }, [setqtyGoods, qtyGoods])

  const controlOnclick = {
    delete: deleteQty,
    submit: useCallback(() => {
      if (qtyGoods > 0) {
        setType(null)();
        addItem({ item: selectedItem, calcValue: qtyGoods })
      };
    }, [qtyGoods, setType, addItem, selectedItem]),
  }
  return (
    <div className={inputContainer}>
      <HeadInput
        inputValue={qtyGoods}
        inputName={NameCalc} />
      <div className={keyboardContainer}>
        <NumberKeyboard onClick={getQty} />
        <ControlKeyboard inputValue={qtyGoods} onClick={controlOnclick} />
      </div>
    </div>
  )
}

export default InputQty;