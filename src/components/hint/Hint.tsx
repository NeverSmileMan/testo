import React, { FC, useEffect, useState } from 'react';
import { useStyles } from './Hint.styles';
import { useHints } from './hint.provider';

export const Hint: FC = () => {
	const { hint, error } = useHints();
	const [showError, setShowError] = useState<boolean>(false);
	const classes = useStyles(showError);

	let timeout: NodeJS.Timeout;
	useEffect(() => {
		if (error) {
			setShowError(true);
			timeout = setTimeout(() => {
				setShowError(false);
			}, 300);
		}
		return () => clearTimeout(timeout);
	}, [error]);

	return (
		<div className={classes.hints}>
			<div className={classes.hintsMessages}>{hint}</div>
		</div>
	);
};
