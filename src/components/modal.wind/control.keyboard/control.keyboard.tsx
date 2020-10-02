import React, { useCallback } from 'react';
// import {KeyboardBtn} from '../keyboard.btn/keyboard.btn';
import { Button } from '../../keyboard/button/button';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { useStyle } from './control.keyboard.style';
import { styles } from '../../homeButton/HomeButton.styles';

interface Prop {
  onClick: {
    submit: () => any,
    delete: () => any,
  },
  inputValue: number
}
interface Styles {
  textColor?: string,
  colorBtn?: string,
  fontSize?: string,
  filter?: string
}

export const ControlKeyboard = ({ onClick, inputValue }: Prop) => {
  const theme = useTheme<Theme>();
  const control = [<span>&#8592;</span>, <span>&#10003;</span>];
  const { controlContainer } = useStyle();


  const styles = {
    textColor: '#fff',
    colorBtn: theme.palette.primary.main,
    fontSize: '0.8em'
  }

  const controlBtnClass = useCallback((index:number): Styles =>
    (index === 1 && inputValue <= 0)
      ? styles
      : { ...styles, filter: 'brightness(150%)' },
    [inputValue, styles])
  return (
    <div className={controlContainer}>
      {control.map((val, index, array) => {
        const getControlRenderOnClick = (arr: Array<JSX.Element>, ind: number) => {
          ind === arr.length - 1 ? onClick.submit() : onClick.delete()
        }
        return (
          <Button
            onClick={() => getControlRenderOnClick(array, index)}
            key={index}
            styles={{...controlBtnClass(index)}}
            className=''
          >
            { val}
          </Button>
        )
      }
      )}
    </div >
  )
}
