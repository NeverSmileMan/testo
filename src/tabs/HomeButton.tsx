import React, {FC} from 'react';
import {makeStyles} from "@material-ui/styles";
import HomeIcon from '@material-ui/icons/Home';

interface OwnProps {
}

const styles = makeStyles({
	home: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	}
})

const HomeButton: FC<OwnProps> = (props) => {

	const click = (e: React.MouseEvent<HTMLDivElement>) => {
		console.log('home', e.target)
	}

	const {home} = styles()

	return (
			<div className={home} onClick={click}>
				<HomeIcon fontSize="small"/>
			</div>
	);
};

export default HomeButton;