import React, { useCallback } from 'react';
import KeyboardBtn from './keyboard.btn';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const useStyle = makeStyles({
  controlContainer: {
    display: 'grid',
    gridTemplateColumns: '50px',
    gridTemplateRows: 'repeat(2, 105px)',
    gridRowGap: '10px',
    padding: '5px',
    fontSize: '50px',
  }
})

interface Prop {
  onClick: {
    submit: () => any,
    delete: () => any,
  },
  inputValue: number
}

const ControlKeyboard = ({ onClick, inputValue }: Prop) => {
  const theme = useTheme<Theme>();
  const control = [<span>&#8592;</span>, <span>&#10003;</span>];
  const { controlContainer } = useStyle();
  const controlBtnClass = useCallback((index): string =>
    (index === 1 && inputValue <= 0)
      ? 'backLigth'
      : '',
  [inputValue])

  return (
    <div className={controlContainer}>
      {control.map((val, index) => (
        <KeyboardBtn
          onClick={index === control.length - 1 ? () => onClick.submit() : () => onClick.delete()}
          key={index}
          btnName={val}
          textColor='#fff'
          colorBtn={theme.palette.primary.main}
          nameClass={controlBtnClass(index)} />)
      )}
    </div>
  )
}

export default ControlKeyboard;