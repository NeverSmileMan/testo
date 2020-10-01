import React, { useState, useContext, useCallback } from 'react';
import { MainContext } from '../../../../entries/components/main/main';
import { ControlKeyboard } from '../../control.keyboard/control.keyboard';
import { HeadInput } from '../../head.input/head.input';
import { useStyle } from './input.qty.style';
import { KeyboardNumeric } from '../../../keyboard/keyboard.numeric/keyboard.numeric';
import {keyboardSettings} from '../../../keyboard/keyboard.main/keyboard.settings';
import {useStyles} from '../../../keyboard/keyboard.numeric/keyboard.numeric.styles'

const NameCalc = 'Кількість';

interface Prop {
  modalClose: () => any;
}
export const InputQty = ({ modalClose }: Prop) => {
  const { inputContainer, keyboardContainer } = useStyle();
  const [qtyGoods, setqtyGoods] = useState(0);
  const classesNumeric = useStyles({gridColumn_9 : '1 / 3'});
  const { selectedItem, addItem } = useContext(MainContext);
  const getQty = useCallback((num: string): void => {
    setqtyGoods(qtyGoods * 10 + Number(num))
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
        <KeyboardNumeric options={keyboardSettings.numeric} onClick={getQty} styles={classesNumeric} />
        <ControlKeyboard inputValue={qtyGoods} onClick={controlOnclick} />
      </div>
    </div>
  )
}
