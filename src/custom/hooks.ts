import React from 'react';
import {Hints} from './variables';

export function useHints(): [Hints, boolean, (str: Hints, likeError?: boolean) => void] {
	const [hint, setHint] = React.useState<Hints>(Hints.PutItems);
	const [error, setError] = React.useState<boolean>(false);

	const changeHint = React.useCallback((str: Hints, likeError?: boolean) => {
		setHint(str)
		likeError ? setError(true) : setError(false)
	}, []);

	return [hint, error, changeHint];
}
