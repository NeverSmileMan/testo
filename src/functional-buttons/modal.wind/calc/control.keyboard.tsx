import React from 'react';
import KeyboardBtn from './keyboard.btn';
import {makeStyles, useTheme} from '@material-ui/styles';
import {Theme} from '@material-ui/core/styles/createMuiTheme';

const useStyle = makeStyles({
	controlContainer: {
		display: 'grid',
		gridTemplateColumns: '50px',
		gridTemplateRows: 'repeat(2, 105px)',
		gridRowGap: '10px',
		padding: '5px',
		fontSize: '50px',
	}
})

interface Prop {
	onClick: {
		submit: () => any,
		delete: () => any,
	}
}

const ControlKeyboard = ({onClick}: Prop) => {
	const theme = useTheme<Theme>();
	const control = [<span>&#8592;</span>, <span>&#10003;</span>];
	const {controlContainer} = useStyle()

	return (
		<div className={controlContainer}>
			{control.map((val, index) => {
				if (index === control.length - 1) {
					return (<KeyboardBtn
						onClick={() => onClick.submit()}
						key={index}
						btnName={val}
						textColor='#fff'
						colorBtn={theme.palette.primary.main}
						nameClass={'backLigth'}/>)
				}
				return (<KeyboardBtn
					onClick={() => onClick.delete()}
					key={index}
					btnName={val}
					textColor='#fff'
					colorBtn={theme.palette.primary.main}/>)
			})}
		</div>
	)
}

export default ControlKeyboard;