import React, { ReactElement } from 'react'
import { useStylesAlphabet } from './keyboard.alphabet.styles';

export function Offset({condition} : any) : ReactElement {
  const classes = useStylesAlphabet();
  if(condition) {
    return <div className={classes.offset}></div>;
  } 
  return  <></>;
}
