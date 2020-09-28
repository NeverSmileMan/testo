import React, { useState, ReactElement } from 'react';
import { KeyboardAlphabet } from '../keyboard.alphabet/keyboard.alphabet';
import { KeyboardNumeric } from '../keyboard.numeric/keyboard.numeric';
import { KeyboardSpecial } from '../keyboard.special/keyboard.special';
import { Service, IKeyboard, Lang } from './keyboard.interfaces';
import { useStylesKeyboard } from './keyboard.styles';
import { LayoutContext } from './keyboard.context';

function getDefaultLayout<T>(obj: T) {
  return Object.keys(obj)[0];
}

interface Props {
  service: Service;
  keyboardLayout: IKeyboard;
}

export default function KeyboardMain({ service, keyboardLayout }: Props): ReactElement {
  const [layoutName, setLayoutName] = useState(
    getDefaultLayout(keyboardLayout.alphabet.keys) as Lang,
  );
  const classes = useStylesKeyboard();

  return (
    <div className={`${classes.keyboard} ${classes.grid}`}>
      <LayoutContext.Provider
        value={{
          name: layoutName,
          setName: setLayoutName,
          names: Object.keys(keyboardLayout.alphabet.keys) as Lang[],
        }}
      >
        {keyboardLayout.alphabet ? (
          <div className={classes.alphabet}>
            <KeyboardAlphabet opts={keyboardLayout.alphabet} service={service} />
          </div>
        ) : null}
        {keyboardLayout.numeric ? (
          <div className={classes.numeric}>
            <KeyboardNumeric options={keyboardLayout.numeric} service={service} />
          </div>
        ) : null}
        {keyboardLayout.special ? (
          <div className={classes.special}>
            <KeyboardSpecial options={keyboardLayout.special} service={service} />
          </div>
        ) : null}
      </LayoutContext.Provider>
    </div>
  );
}
