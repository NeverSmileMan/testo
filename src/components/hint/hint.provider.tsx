import React from 'react';
import { Hints } from './hint.settings';

const HintsContext = React.createContext({
	hint: '' as Hints,
	error: false,
	changeHint: (str: Hints, likeError?: boolean) => {},
});

export const HintsProvider: React.FC<{}> = ({ children }) => {
	const [hint, setHint] = React.useState<Hints>(Hints.PutItems);
	const [error, setError] = React.useState<boolean>(false);

	const changeHint = React.useCallback((str: Hints, likeError?: boolean) => {
		setHint(str);
		likeError ? setError(true) : setError(false);
  }, []);

	return <HintsContext.Provider value={{ hint, error, changeHint }}>{children}</HintsContext.Provider>;
};

export function useHints() {
	const { hint, error, changeHint } = React.useContext(HintsContext);
	return { hint, error, changeHint, Hints };
}