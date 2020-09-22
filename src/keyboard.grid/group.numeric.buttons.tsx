import React, {useMemo} from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from './button';
import {Numeric, Key, KeyWithOpts, Servise} from './keyboard';
import {getKeyboardGridStyle} from './funcs';

interface Props {
  options: Numeric;
  service: Servise; 
}

const useStyles2 = makeStyles({
	keyboardNumeric: {
		height: '100%',
    width: '17%',
    boxSizing: 'border-box',
		// backgroundColor: (props: any) => props.backgroundColor,
  },
  btnNumeric: {
    background: '#c9c9c9',
  },
});




export default function GroupNumericButtons({options, service} : Props) {
  const grid = getKeyboardGridStyle(options.options, options.keys, 'num');

  const useStyles = useMemo(() => makeStyles(grid), []);
  const classes = useStyles();
  
  const classes2 = useStyles2();




// console.log(classes);


  return (
    <div className= {`${classes2.keyboardNumeric} ${classes.grid_num}`} >
      {options.keys.map((item: Key, id: number) => (
          <Button key={id} value={(item as KeyWithOpts).key ?? item  } callback={service[options.action]} className={`${classes2.btnNumeric} ${classes[`${id}_num`]}`} />
      ))}
    </div>
  )
}

