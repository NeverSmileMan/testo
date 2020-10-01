import React, { useCallback } from 'react';
import { Button } from '../../keyboard/button/button'
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { useStyle } from './control.keyboard.style';

interface Prop {
  onClick: {
    submit: () => any,
    delete: () => any,
  },
  inputValue: number
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

  const controlBtnClass = useCallback((index):object =>
  (index === 1 && inputValue <= 0)
    ? {...styles, filter: 'brightness(150%)'}
    : styles,
  [inputValue, styles])

  // const renderFunction =(arr:[]) => arr.map((val, index) => index === arr.length - 1 ? onClick.submit() : onClick.delete())
  return (
    <div className={controlContainer}>
      {control.map((val, index, array) => {
        const getButtonClickHandler = (arr: Array<JSX.Element>, index: number) => {
          index === arr.length - 1 ? onClick.submit() : onClick.delete()
        }
       
        return (
          <Button
            onClick={() => getButtonClickHandler(array, index)}
            key={index}
            styles={controlBtnClass(index)}
            className={''}
          >
            {val}
          </Button>
        )
      }
      )}
    </div>
  )
}
