import React, {useContext, useMemo, } from 'react';
import Button from './button';
import { makeStyles } from '@material-ui/styles';
import {createGrid} from './funcs';
import {LayoutContext, Key, KeyWithOpts, Alphabet, Servise} from './keyboard';

interface Props {
  options: Alphabet;
  service: Servise;
}

const useStyles2 = makeStyles({
	keyboardAlphabet: {
    height: '100%',
    width: '76%',
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

export default function GroupAlphabetButtons({options, service} : Props) {
  const grid = createGrid(options.keys, options.options);

  const useStyles = useMemo(() => makeStyles(grid), []);
  const classes = useStyles();
  const layout = useContext(LayoutContext);
  
  const classes2 = useStyles2();
  // console.log(classes);
  
  
  return (
    <div className={classes2.keyboardAlphabet +" " + (classes as any)[`grid_${layout.name}`] }>
       {options.keys[layout.name].map((item: Key, id: number) => (
         <Button key={id} value={(item as KeyWithOpts).key ?? item  } callback={service[options.action]}  className={'btn-alphabet ' +  (classes as any)[`${id}_${layout.name}`] } />
         ))}
    </div>
  )
}

