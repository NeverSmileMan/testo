import React, { useState, FC } from 'react';
import { KeyboardAlphabet } from '../keyboard.alphabet/keyboard.alphabet';
import { KeyboardNumeric } from '../keyboard.numeric/keyboard.numeric';
import { KeyboardSpecial } from '../keyboard.special/keyboard.special';
import { IKeyboard, Service, Lang } from './keyboard.interfaces';
import { useStylesKeyboard } from './keyboard.styles';
import { LayoutContext, Context } from './keyboard.context';

function getDefaultLayout<T>(obj: T) {
  return Object.keys(obj)[0];
}

interface Props {
  service: Service;
  keyboardLayout: IKeyboard;
}

export const KeyboardMain: FC<Props> = (props) => {
  const { service, keyboardLayout } = props;
  const [layoutName, setLayoutName] = useState(getDefaultLayout(keyboardLayout.alphabet.keys));
  const classes = useStylesKeyboard();
  return (
    <div className={`${classes.keyboard} ${classes.grid}`}>
      <LayoutContext.Provider
        value={
          {
            name: layoutName,
            setName: setLayoutName,
            names: Object.keys(keyboardLayout.alphabet.keys),
          } as Context<Lang>
        }
      >
        <div className={classes.alphabet}>
          <KeyboardAlphabet opts={keyboardLayout.alphabet} service={service} />
        </div>
        <div className={classes.numeric}>
          <KeyboardNumeric
            options={keyboardLayout.numeric}
            onClick={service[keyboardLayout.numeric.action]}
            styles={{
              gridTemplateRows: `repeat(${keyboardLayout.numeric.options.row}, 1fr)`,
              gridTemplateColumns: `repeat(${keyboardLayout.numeric.options.col}, 1fr)`,
            }}
          />
        </div>
        <div className={classes.special}>
          <KeyboardSpecial options={keyboardLayout.special} service={service} />
        </div>
      </LayoutContext.Provider>
    </div>
  );
};
