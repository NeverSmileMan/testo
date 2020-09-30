import React, { FC } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { useStyles } from "./HomeButton.styles";

interface OwnProps {
}

export const HomeButton: FC<OwnProps> = () => {
	const click = ( e: React.MouseEvent<HTMLDivElement> ) => {
		console.log( 'home', e.target )
	}

	const classes = useStyles()

	return (
		<div className={ classes.home } onClick={ click }>
			<HomeIcon fontSize="small"/>
		</div>
	);
};