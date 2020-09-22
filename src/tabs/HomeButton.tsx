import React, { FC } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import { styles } from "./styles";

interface OwnProps {
}
const HomeButton: FC<OwnProps> = ( props ) => {

	const click = ( e: React.MouseEvent<HTMLDivElement> ) => {
		console.log( 'home', e.target )
	}

	const { home } = styles()

	return (
		<div className={ home } onClick={ click }>
			<HomeIcon fontSize="small"/>
		</div>
	);
};

export default React.memo( HomeButton );