import React, { useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	title: {
		display: 'flex',
		justifyContent: 'center',
		color: '#fff',
		fontSize: '40px',
	}
})

interface Prop {
	title?: string;
	print: () => void
}

const titlePrint: string = 'Зніміть товар з вагів';

const ModalPrint = ({ title = titlePrint, print }: Prop) => {
	const cls = useStyles();
	return <div className={cls.title} onClick={print}>{title}</div>

}

export default ModalPrint;