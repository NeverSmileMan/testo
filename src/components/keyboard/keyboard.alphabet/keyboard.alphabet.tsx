import React, { useContext, FC } from 'react';
import { LayoutContext } from '../keyboard.main/keyboard.context';
import { Alphabet, KeyboardService, Key } from '../keyboard.main/keyboard.interfaces';
import { Button } from '../button/button';
import { useStylesAlphabet } from './keyboard.alphabet.styles';
import { Offset } from './keyboard.alfabet.offset';

interface Props {
  opts: Alphabet;
  service: KeyboardService;
}

export const KeyboardAlphabet : FC<Props> = (props) => {
  const { opts, service } = props;
  const layout = useContext(LayoutContext);
  const classes = useStylesAlphabet();

  return (
    <div className={classes.keyboardAlphabet}>
      {opts.keys[layout.name].map((keys: Key[], i: number) => {
        return (
          <React.Fragment key={keys[0]}>
            <div key={`${keys[0]}x`} className={classes.row}>
              <Offset condition={i % 2} key={`${keys[0]}i`}/>
              {keys.map((item: Key) => (
                <Button
                  key={item}
                  value={item}
                  callback={service[opts.action]}
                  className={item === ' ' ? classes.space : ''}
                />
              ))}
              <Offset  condition={layout.name !== 'en' && !(i % 2)} key={`${keys[0]}o`}/>
              <Offset  condition={layout.name === 'en' && i % 2} key={`${keys[0]}j`}/>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
