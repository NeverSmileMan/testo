import React, {useCallback, useContext} from 'react';
import {makeStyles} from '@material-ui/styles';
import {MainContext} from "../../main";

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
}

const titlePrint: string = 'Зніміть товар з вагів';

const ModalPrint = ({title = titlePrint}: Prop) => {
	const {print} = useContext(MainContext)
	const cls = useStyles();
	return <div className={cls.title} onClick={print}>{title}</div>

}

export default ModalPrint;