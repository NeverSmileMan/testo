import React, {FC, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/styles';
import {Hints} from '../custom/variables';

export interface HintsProps {
	hint: Hints;
	error: boolean;
}

const styles = makeStyles({
	hints: {
		width: '400px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100%',
	},
	hints_messages: {
		width: '100%',
		height: '80%',
		borderRadius: '.4rem',
		fontSize: '.6em',
		border: '1px solid #797979',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	hints_error: {
		color: 'white',
		background: 'red',
	},
});

const Hint: FC<HintsProps> = ({hint, error}) => {
	const {hints, hints_messages, hints_error} = styles();
	const [classError, setClassError] = useState<string>(error ? `${hints_messages} ${hints_error}` : hints_messages);

	let timeout: NodeJS.Timeout
	useEffect(() => {
		if (error) {
			setClassError(`${hints_messages} ${hints_error}`)
			timeout = setTimeout(() => { setClassError(hints_messages) }, 300)
		} else {
			setClassError(hints_messages)
		}
		return () => clearTimeout(timeout)
	}, [error])

	return (
		<div className={hints}>
			<div className={classError}>{hint}</div>
		</div>
	);
};

export default React.memo(Hint);