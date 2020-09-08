import React, { useContext, useMemo } from 'react';
import Button from './button';
import { makeStyles } from '@material-ui/styles';
import { LayoutContext, Key, KeyWithOpts, Alphabet, Servise } from './keyboard.flex';

interface Props {
	opts: Alphabet;
	service: Servise;
}

const useStyles = makeStyles({
	keyboardAlphabet: {
		height: '100%',
		display: 'flex',
		boxSizing: 'border-box',
		flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent:'space-around',
	},
	rowWrap: {
		height: '0px',
		width: '100%',
	},
	alphabetBtn: {
    width: (props : any) => `${props.width-1}%`,
    height: '30%',
    margin: '0.1em',
	},
	space_uk: {
    width: (props : any) => `${props.width * 3}%`,
	},
	space_ru: {
    width: (props : any) => `${props.width * 3}%`,
	},
	space_en: {
    width: (props : any) => `${props.width * 3}%`,
	},
	spacer: {
    width: '2%',
    height: '30%',
    margin: '0.1em',
  },
});

export default function GroupAlphabetButtons({ opts, service }: Props) {
	const layout = useContext(LayoutContext);
	const classes2 = useStyles({width: 100/(opts.options[layout.name].col + (layout.name === 'en' ? 1 : 0) ), height: 100/opts.options[layout.name].col,});

	const keys = useMemo(() => {
		const keys: any = [];

		for (let j = 0; j < opts.options[layout.name].row; j++) {
      if (j%2) {
        keys.push(<div key={`${j}_spacer`} className={classes2.spacer}></div>);
      }
			for (let i = 0; i < opts.options[layout.name].col + (layout.name === 'en' && j === 0 ? 1 : 0); i++) {
				let id = j * opts.options[layout.name].col + i + (layout.name === 'en' && j > 0 ? 1 : 0);
				if (id >= opts.keys[layout.name].length) {
					continue;
				}
				let value = (opts.keys[layout.name][id] as KeyWithOpts).key ?? opts.keys[layout.name][id];
				keys.push(
					<Button
						key={id}
						value={value}
						callback={service[opts.action]}
						className={classes2.alphabetBtn + ' ' + (value === ' ' ? (classes2 as any)[`space_${layout.name}`] : '')}
					/>,
				);
      }
      if (!(j%2)) {
        keys.push(<div key={`${j}_spacer`} className={classes2.spacer}></div>);
      }
      keys.push(<div key={`${j}_divider`} className={classes2.rowWrap}></div>);

      
		}

		return keys;
	}, [opts, layout]);

	console.log(keys);

	return (
		// <div className={classes2.keyboardAlphabet + ' ' }>
		<div className={classes2.keyboardAlphabet}> 
			<>
				{keys.map((item: any) => {
					return item;
				})}
			</>
		</div>
	);
}
