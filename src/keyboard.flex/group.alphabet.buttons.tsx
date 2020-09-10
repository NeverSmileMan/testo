import React, { useContext } from 'react';
import { LayoutContext } from './keyboard.flex';
import Button from './button';
import { makeStyles } from '@material-ui/styles';
import { Key } from './keyboard.flex';

const useStyles = makeStyles({
	keyboardAlphabet: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		width: '100%',
		boxSizing: 'border-box',
	},
	row: {
		display: 'flex',
		flexGrow: 1,
		boxSizing: 'border-box',
	},
	spacer: {
		margin: '0.2em',
	},
	offset: {
		width: '30%',
	},
	space: {
		width: '300%',
	},
});

export default function GroupAlphabetButtons({ opts, service }: any) {
	const layout = useContext(LayoutContext);

	const classes = useStyles();

	return (
		<div className={classes.keyboardAlphabet}>
			{opts.keys[layout.name].map((item: Key[], i: number) => {
				return (
					<>
						<div key={`${i}x`} className={classes.row}>
							{i % 2 ? <div key={`${i}i`} className={classes.offset}></div> : null}
							{item.map((item: Key, index) => (
								<Button
									key={index}
									value={item}
									callback={service[opts.action]}
									className={item === ' ' ? classes.space : ''}
								/>
							))}
							{!(i % 2) ? <div key={`${i}o`} className={classes.offset}></div> : null}
						</div>
						{i < opts.keys[layout.name].length - 1 ? <div key={`${i}z`} className={classes.spacer}></div> : null}
					</>
				);
			})}
		</div>
	);
}
