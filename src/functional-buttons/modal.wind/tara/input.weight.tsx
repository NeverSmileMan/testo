import React, { useState, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import { MainContext } from '../../../main/main';
import NumberKeyboard from '../calc/numder.keyboard';
import ControlKeyboard from '../calc/control.keyboard';
import HeadInput from '../calc/head.input';
import {useHints} from '../../../tabs/hint/hint.provider'


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

const NameCalc = 'Тара'
const InputWeight = () => {
  const { inputContainer, keyboardContainer } = useStyle();
  const { submitValueCalc } = useContext(MainContext);
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
      }
    }, [inputValue, submitValueCalc]),
  };

  return (
    <div className={inputContainer}>
      <HeadInput
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