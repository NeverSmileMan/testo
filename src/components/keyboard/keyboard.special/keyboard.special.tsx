import React, { ReactElement, useContext, useCallback } from 'react';
import { Button } from '../button/button';
import { Special, SpecialKey, KeyboardService, Actions } from '../keyboard.main/keyboard.interfaces';
import { LayoutContext } from '../keyboard.main/keyboard.context';
import { useStylesSpecial } from './keyboard.special.styles';

interface Props {
  options: Special;
  service: KeyboardService;
}

export function KeyboardSpecial({ options, service }: Props): ReactElement {
  const layout = useContext(LayoutContext);
  const classes = useStylesSpecial();

  const changeLayout = useCallback(() => {
    const index = layout.names.indexOf(layout.name);

    if (index + 1 === layout.names.length) {
      layout.setName(layout.names[0]);
    } else {
      layout.setName(layout.names[index + 1]);
    }
  }, [layout]);

  return (
    <div className={`${classes.keyboardSpecial} ${classes.keyboardSpecialGrid}`}>
      {options.keys.map((item: SpecialKey, id) =>
        item.name === 'layout' ? (
          <Button
            key={item.id}
            callback={changeLayout}
            className={classes.btnSpecial}
            value={item.value}
          >
            <>{item.layouts ? item.layouts[layout.name] : null}</>
          </Button>
        ) : (
          <Button
            key={item.id}
            callback={service[item.action as keyof Actions]}
            value={item.value}
            className={`${classes.btnSpecial} skey_${id} ${
              item.value === 'CLEAR' ? classes.clearBtn : ''
            }`}
          >
            {item.icon ?? null}
          </Button>
        ),
      )}
    </div>
  );
}
