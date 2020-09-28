import React, { FC, useEffect, useState } from 'react';
import { styles } from "./Hint.styles";
import { useHints } from './hint.provider';
import { Hints } from './hint.settings';
export interface HintsProps {
	hint: Hints;
	error: boolean;
}

export const Hint: FC<{}> = () => {
	const classes = styles();
	const {hint, error} = useHints();
	const [classError, setClassError] = useState<string>(error ? `${classes.hints_messages} ${classes.hints_error}` : classes.hints_messages);

	let timeout: NodeJS.Timeout
	useEffect(() => {
		if (error) {
			setClassError(`${classes.hints_messages} ${classes.hints_error}`)
			timeout = setTimeout(() => { setClassError(classes.hints_messages) }, 300)
		} else {
			setClassError(classes.hints_messages)
		}
		return () => clearTimeout(timeout)
	}, [error])

	return (
		<div className={classes.hints}>
			<div className={classError}>{hint}</div>
		</div>
	);
};