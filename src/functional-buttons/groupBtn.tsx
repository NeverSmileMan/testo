import React, {useState, createContext} from 'react';
import Button from './button/button';
import Speed from '@material-ui/icons/Speed';
import Print from '@material-ui/icons/Print';
import CheckCircle from '@material-ui/icons/CheckCircle';
import {makeStyles} from '@material-ui/styles';
import ModalWindow from './modal.wind/modal.wind';

const buttons = [
	{
		type: 'tara',
		text: 'тара',
		renderIcon: () => (<Speed/>)
	},
	{
		type: 'print',
		text: 'друк',
		renderIcon: () => (<Print/>)
	},
	{
		type: 'close',
		text: 'закрити',
		renderIcon: () => (<CheckCircle/>)
	}
]

const useStyles = makeStyles({
	btns: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
	},
})

export const TypeContext = React.createContext({
	modalType: '' as string | null,
	setType: (val: string) => {
	}
});

const GroupBtn = () => {
	const cls = useStyles();
	const [modalType, setModalType] = useState(null as string | null);
	const setType = (type: string | null): any => () => setModalType(type)
	return (
		<TypeContext.Provider value={{modalType, setType}}>
			{modalType && (<ModalWindow type={modalType} click={setType(null)}/>)}
			<div className={cls.btns}>
				{buttons.map((val) =>
					<Button
						key={val.text}
						click={setType(val.type)}
						nameButton={val.text}
						buttonIcon={val.renderIcon}
					/>
				)}
			</div>
		</TypeContext.Provider>
	)
}

export default GroupBtn;