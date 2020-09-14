import React, { useState, useContext, useCallback } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { MainContext } from '../../../main';
import NumberKeyboard from './numder.keyboard';
import ControlKeyboard from './control.keyboard';


const useStyle = makeStyles((theme: Theme) => createStyles({
  inputConteiner: {
    width: '310px',
    marginRight: '12px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    height: '30px',
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between;',
    marginBottom: '15px',
  },
  inputHead: {
    backgroundColor: theme.palette.primary.main,
    height: '110px',
    padding: '0 10px',
    borderRadius: '10px 10px 0 0',
  },
  weigh: {
    color: '#000',
    fontSize: '30px',
    paddingLeft: '10px',
  },
  keyboardConteiner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  }
}))
const InputWeight = () => {
  const { inputConteiner, inputHead, head, input, weigh, keyboardConteiner } = useStyle();
  const { setType, setError } = useContext(MainContext);
  const [weihghtTara, setWeihghtTara] = useState(0)
  
  const getWeight = useCallback((num: number): any => () => {
    const weitght = weihghtTara * 10 + num;
    weitght>= 5000 ? setError('Вага не має перевищувати 5кг') : setWeihghtTara(weitght)
  }, [setWeihghtTara, weihghtTara])

  const deleteWeight = useCallback(() => {
    setWeihghtTara(Math.trunc(weihghtTara / 10))
  },[setWeihghtTara,weihghtTara])

  return (
    <div className={inputConteiner}>
      <div className={inputHead}>
        <div className={head}>
          <div>Тара</div>
          <div
            onClick={setType(null)}>
            &#10005;
          </div>
        </div>
        <div className={input}>
          <div className={weigh}>{(weihghtTara / 1000).toFixed(3)}</div>
          <div></div>
        </div>
      </div>
      <div className={keyboardConteiner}>
        <NumberKeyboard onClick={getWeight} />
        <ControlKeyboard onClick={deleteWeight}/>
      </div>
    </div>
  )
}

export default InputWeight;