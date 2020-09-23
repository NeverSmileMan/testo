import React, { useState, useCallback } from 'react';
import NumberKeyboard from '../../calc/number.keyboard/numder.keyboard';
import ControlKeyboard from '../../calc/control.keyboard/control.keyboard';
import HeadInput from '../../calc/head.input/head.input';
import {useHints} from '../../../../tabs/hint/hint.provider';
import {useStyle} from './input.weight.style';

interface Prop {
  submitValueCalc: (num:number) => void;
  modalClose: ()=>any;
}
const NameCalc = 'Тара'
const InputWeight = ({modalClose, submitValueCalc}:Prop) => {
  const { inputContainer, keyboardContainer } = useStyle();
  const { changeHint, Hints } = useHints();
  const [inputValue, setWeihghtTara] = useState(0)

  const getWeight = useCallback((num: number): any => () => {
    const weitght = inputValue * 10 + num;
    weitght >= 5000 ? changeHint(Hints.MaxWeight, true) : setWeihghtTara(weitght)
  }, [setWeihghtTara, inputValue, changeHint])

  const deleteWeight = useCallback(() => {
    setWeihghtTara(Math.trunc(inputValue / 10));
  }, [setWeihghtTara, inputValue]);

  const controlOnckick = {
    delete: deleteWeight,
    submit: useCallback(() => {
      if (inputValue > 0) {
        submitValueCalc(inputValue)
        modalClose()
      }
    }, [modalClose,inputValue, submitValueCalc]),
  };

  return (
    <div className={inputContainer}>
      <HeadInput
        modalClose={modalClose}
        inputValue={(inputValue / 1000).toFixed(3)}
        inputName={NameCalc} />
      <div className={keyboardContainer}>
        <NumberKeyboard onClick={getWeight} />
        <ControlKeyboard inputValue={inputValue} onClick={controlOnckick} />
      </div>
    </div>
  )
}

export default InputWeight;