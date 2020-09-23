import React from 'react';
import {useStyle} from './modal.print.style';

interface Prop {
	title?: string;
	print: () => void
}

const titlePrint: string = 'Зніміть товар з вагів';

const ModalPrint = ({ title = titlePrint, print }: Prop) => {
	const cls = useStyle();
	
	return <div className={cls.title} onClick={print}>{title}</div>
}

export default ModalPrint;