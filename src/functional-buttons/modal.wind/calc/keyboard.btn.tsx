import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
	btn: ({borderColor, colorBtn, textColor}: StyleProp) => ({
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colorBtn,
		border: `2px solid ${borderColor}`,
		borderRadius: '10px',
		color: textColor,
		fontSize: '35px'
	}),
	btn0: {
		gridColumnStart: '1',
		gridColumnEnd: '3',
	},
	backLigth: {
		filter: 'brightness(150%)',
	}
}))

interface StyleProp {
	borderColor?: string;
	colorBtn?: string;
	textColor?: string;
}

interface Prop extends StyleProp {
	btnName?: string | any;
	nameClass?: string;
	onClick: () => any;
}

// const rnjnd = (): any => { console.log('click') }
const KeyboardBtn = ({
	                     btnName,
	                     borderColor = 'none',
	                     textColor = '#000',
	                     colorBtn = '#e4e4e4',
	                     nameClass,
	                     onClick
                     }: Prop) => {
	const cls: Record<string, string> = useStyles({borderColor, colorBtn, textColor});
	const namedClass = nameClass && cls[nameClass]
		? `${cls.btn} ${cls[nameClass]}`
		: `${cls.btn}`
	return (
		<div onClick={onClick} className={namedClass}>{btnName}</div>
	)
}

export default KeyboardBtn;