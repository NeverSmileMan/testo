import React, {FunctionComponent} from 'react';
import {makeStyles} from "@material-ui/styles";
import HomeIcon from '@material-ui/icons/Home';

interface OwnProps {
}

type Props = OwnProps;

const HomeButton: FunctionComponent<Props> = (props) => {

	const click = (e: React.MouseEvent<HTMLButtonElement>) => {
		console.log('home', e.target)
	}

	const styles = makeStyles({
		home: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			height: '100%'
		}
	})

	const {home} = styles()
	return (
		<div className={home}>
			<button onClick={click}>
				<HomeIcon fontSize="small" />
			</button>
		</div>
	);
};

export default HomeButton;