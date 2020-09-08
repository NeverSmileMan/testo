import React, {FunctionComponent, useState} from 'react';
import {makeStyles} from "@material-ui/styles";

interface OwnProps {
}

type Props = OwnProps;

const Hints: FunctionComponent<Props> = (props) => {


	const [state, setState] = useState('Вага товару має перевищувати 40 грам')

	const styles = makeStyles({
		hints: {
			width: '400px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '.4rem 0 .4rem .4rem',
			height: '100%',
		},
		hints_messages: {
			width: '100%',
			height: '100%',
			borderRadius: '.4rem',
			padding: '.8em',
			fontSize: '.8em',
			border: '1px solid #797979',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}
	})

	const {hints, hints_messages} = styles()

	return (
		<div className={hints}>
			<div className={hints_messages}>{state}</div>
		</div>
	);
};

export default Hints;
