import React, { useState, useContext, useCallback } from 'react';
import { MainContext } from '../../../../entries/components/main/main';
import NumberKeyboard from '../../calc/number.keyboard/numder.keyboard';
import ControlKeyboard from '../../calc/control.keyboard/control.keyboard';
import HeadInput from '../../calc/head.input/head.input';
import {useStyle} from './input.qty.style';

const NameCalc = 'Кількість';

interface Prop {
  modalClose: ()=>any;
}
const InputQty = ({modalClose}:Prop) => {
  const { inputContainer, keyboardContainer } = useStyle();
  const [qtyGoods, setqtyGoods] = useState(0);
  const { selectedItem, addItem } = useContext(MainContext);
  const getQty = useCallback((num: number): any => () => {
    setqtyGoods(qtyGoods * 10 + num)
  }, [setqtyGoods, qtyGoods]);

  const deleteQty = useCallback(() => {
    setqtyGoods(Math.trunc(qtyGoods / 10));
  }, [setqtyGoods, qtyGoods]);

  const controlOnclick = {
    delete: deleteQty,
    submit: useCallback(() => {
      if (qtyGoods > 0) {
        modalClose();
        addItem({ item: selectedItem, calcValue: qtyGoods })
      };
    }, [qtyGoods, modalClose, addItem, selectedItem]),
  }
  return (
    <div className={inputContainer}>
      <HeadInput
        modalClose={modalClose}
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