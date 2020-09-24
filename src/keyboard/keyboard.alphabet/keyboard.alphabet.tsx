import React, { useContext, ReactElement } from 'react';
import {LayoutContext} from '../keyboard.main/context';
import { Alphabet, Service, Key, Actions } from '../keyboard.main/keyboard.interfaces';
import Button from '../button/button';
import { useStylesAlphabet } from './keyboard.alphabet.styles';

interface Props {
	opts: Alphabet;
	service: Service;
}

export default function GroupAlphabetButtons({ opts, service }: Props): ReactElement {
	const layout = useContext(LayoutContext);
	const classes = useStylesAlphabet();

	return (
		<div className={classes.keyboardAlphabet}>
			{opts.keys[layout.name].map((keys: Key[], i: number) => {
				return (
					<React.Fragment key={keys[0]}>
						<div key={`${keys[0]}x`} className={classes.row}>
							{i % 2 ? <div key={`${keys[0]}i`} className={classes.offset} /> : null}
							{keys.map((item: Key) => (
								<Button
									key={item}
									value={item}
									callback={service[opts.action] as Actions}
									className={item === ' ' ? classes.space : ''}
								/>
							))}
							{layout.name !== 'en' && !(i % 2) ? <div key={`${keys[0]}o`} className={classes.offset} /> : null}
							{layout.name === 'en' && i % 2 ? <div key={`${keys[0]}o`} className={classes.offset} /> : null}
						</div>
						{i < opts.keys[layout.name].length - 1 ? <div key={`${keys[0]}z`} className={classes.spacer} /> : null}
					</React.Fragment>
				);
			})}
		</div>
	);
}
