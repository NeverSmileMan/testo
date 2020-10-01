import React, { useState, useCallback } from 'react';
import {ControlKeyboard} from '../../control.keyboard/control.keyboard';
import {HeadInput} from '../../head.input/head.input';
import {useHints} from '../../../hint/hint.provider';
import {useStyle} from './input.weight.style';
import {KeyboardNumeric} from '../../../keyboard/keyboard.numeric/keyboard.numeric';
import {keyboardSettings} from '../../../keyboard/keyboard.main/keyboard.settings';
import {useStyles} from '../../../keyboard/keyboard.numeric/keyboard.numeric.styles';
// import {useStyleNum} from '../../number.keyboard/number.keyboard.style';
interface Prop {
  submitValueCalc: (num:number) => void;
  modalClose: ()=>void;
}
const NameCalc = 'Тара'
export const InputWeight = ({modalClose, submitValueCalc}:Prop) => {
  const { inputContainer, keyboardContainer } = useStyle();
  const { changeHint, Hints } = useHints();
  const [inputValue, setWeihghtTara] = useState(0)
  const classesNumeric = useStyles({gridColumn_9 : '1 / 3'});

  const getWeight = useCallback((num: string): any => {
    console.log ('well come', num);
    const weitght = inputValue * 10 + Number(num);
    return weitght >= 5000 ? changeHint(Hints.MaxWeight, true) : setWeihghtTara(weitght)
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
        <KeyboardNumeric options={keyboardSettings.numeric} onClick={getWeight} styles={classesNumeric} />
        <ControlKeyboard inputValue={inputValue} onClick={controlOnckick} />
      </div>
    </div>
  )
}

