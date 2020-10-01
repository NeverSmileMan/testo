import React, { FC, useContext, useCallback } from 'react';
import { Button } from '../button/button';
import { Special, SpecialKey, KeyboardService } from '../keyboard.main/keyboard.interfaces';
import { LayoutContext } from '../keyboard.main/keyboard.context';
import { useStylesSpecial } from './keyboard.special.styles';

interface Props {
  options: Special;
  service: KeyboardService;
}

export const KeyboardSpecial: FC<Props> = (props) => {
  const { options, service } = props;
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
      {options.keys.map((item: SpecialKey, id) => (
        <Button
          key={item.id}
          callback={() => service[item.action](item.value)}
          className={`${classes.btnSpecial} skey_${id} ${
            item.action === 'clear' ? classes.clearBtn : ''
          }`}
        >
          {item.icon ?? item.value}
        </Button>
      ))}
      <Button callback={changeLayout} className={classes.btnSpecial}>
        {options.layouts[layout.name]}
      </Button>
    </div>
  );
};
