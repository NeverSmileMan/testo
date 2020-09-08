import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from './button';
import {Numeric, Key, KeyWithOpts, Servise} from './keyboard.flex';

interface Props {
  options: Numeric;
  service: Servise; 
}

const useStyles2 = makeStyles({
	keyboardNumeric: {
		height: '100%',
    boxSizing: 'border-box',
		// backgroundColor: (props: any) => props.backgroundColor,
  },
  btnNumeric: {
		background: '#c9c9c9',
		margin: '0',
  },
});

const useStyles = makeStyles({
	numericGrid: {
		display: 'grid',
		gridGap: '0.15em',
		gridTemplateColumns: 'repeat(3, 1fr)',
		gridTemplateRows: 'repeat(4, 1fr)',
	},
	nkey_0: {
		gridColumn: '1',
		gridRow: '1',
	},
	nkey_1: {
		gridColumn: '2',
		gridRow: '1',
	},
	nkey_2: {
		gridColumn: '3',
		gridRow: '1',
	},
	nkey_3: {
		gridColumn: '1',
		gridRow: '2',
	},
	nkey_4: {
		gridColumn: '2',
		gridRow: '2',
	},
	nkey_5: {
		gridColumn: '3',
		gridRow: '2',
	},
	nkey_6: {
		gridColumn: '1',
		gridRow: '3',
	},
	nkey_7: {
		gridColumn: '2',
		gridRow: '3',
	},
	nkey_8: {
		gridColumn: '3',
		gridRow: '3',
	},
	nkey_9: {
		gridColumn: '1 / 4',
		gridRow: '4',
	},
});



export default function GroupNumericButtons({options, service} : Props) {

  
  const classes = useStyles();
  const classes2 = useStyles2();




// console.log(classes);


  return (
    <div className= {`${classes2.keyboardNumeric} ${classes.numericGrid}`} >
      {options.keys.map((item: Key, id: number) => (
          <Button key={id} value={(item as KeyWithOpts).key ?? item  } callback={service[options.action]} className={(classes as any)[`nkey_${id}`] + ' ' + classes2.btnNumeric} /> 
      ))}
    </div>
  )
}

