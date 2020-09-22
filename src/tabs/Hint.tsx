import React, { FC, useEffect, useState } from 'react';
import { Hints } from '../custom/variables';
import { styles } from "./styles";

export interface HintsProps {
	hint: Hints;
	error: boolean;
}

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