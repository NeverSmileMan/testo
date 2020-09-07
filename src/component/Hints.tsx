import React, {FunctionComponent} from 'react';
import {makeStyles} from "@material-ui/styles";

interface OwnProps {
}

type Props = OwnProps;

const Hints: FunctionComponent<Props> = (props) => {

	const styles = makeStyles({
		hints: {
			width: '400px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: '.4rem 0 .4rem .4rem',
			height: '100%',
		},
		hints_input: {
			width: '100%',
			height: '100%',
			borderRadius: '.4rem',
			padding: '.8em',
			textAlign: 'center',
			fontSize: '.6em',
			border: '1px solid #797979',
		}
	})

	const {hints, hints_input} = styles()

	return (
		<div className={hints}>
			<input className={hints_input}
			       type="text"
			       readOnly={true}
			       value="Вага товару має перевищувати 40 грам"/>
		</div>
	);
};

export default Hints;
