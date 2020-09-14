import React, {FC, useCallback, useState} from 'react';
import {makeStyles} from "@material-ui/styles";

export interface HintsProps {
	error: any
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
		animation: '$error 300ms ',
	},
	'@keyframes error': {
		'0%': {opacity: 0},
		'25%': {opacity: 1},
		'50%': {opacity: 0},
		'75%': {opacity: 1},
		'100%': {opacity: 0},
	},
})

const Hints: FC<HintsProps> = ({error}:HintsProps) => {

	// const [state, setState] = useState('Вага товару має перевищувати 40 грам')
	// const [showErr, setShowErr] = useState(error)
	const {hints, hints_messages, hints_error} = styles()

	// const showError = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
	// 	setShowErr(true)
	// 	setTimeout(() => {
	// 		setShowErr(false)
	// 	}, 300)
	// },[])

	return (
		<div className={hints}>
			<div className={`${hints_messages}`}>{error}</div>
		</div>
	);
};

export default Hints;
