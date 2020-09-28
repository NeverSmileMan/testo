import React, { useContext, useMemo } from 'react';
import { ModalContext } from '../modal.wind/modal.context';
import Button from './button/button';
import Speed from '@material-ui/icons/Speed';
import Print from '@material-ui/icons/Print';
import ModalTara from '../modal.wind/modal.tara/modal.tara';
import ModalClose from '../modal.wind/modal.close/modal.close';
import ModalPrint from '../modal.wind/modal.print/modal.print';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { MainContext } from '../../entries/components/main/main';
import { useStyles } from './group.btn.style';


const GroupBtn = () => {
	const cls = useStyles();
	const { setModalContent } = useContext( ModalContext );
	const { submitValueCalc, deleteTab, activeTab, print } = useContext( MainContext );

	const buttons = useMemo( () => [
		{
			type: 'tara',
			text: 'тара',
			renderIcon: () => (<Speed/>),
			modalContent: <ModalTara submitValueCalc={ submitValueCalc } modalClose={ () => setModalContent( null ) }/>
		},
		{
			type: 'print',
			text: 'друк',
			renderIcon: () => (<Print/>),
			modalContent: <ModalPrint print={ print }/>,
		},
		{
			type: 'close',
			text: 'закрити',
			renderIcon: () => (<CheckCircle/>),
			modalContent: <ModalClose deleteTab={ deleteTab }
			                          activeTab={ activeTab }
			                          modalClose={ () => setModalContent( null ) }/>,
		}
	], [ submitValueCalc, deleteTab, setModalContent, print ] )

	return (
		<div className={ cls.btns }>
			{ buttons.map( ( { text, modalContent, renderIcon } ) =>
				<Button
					key={ text }
					click={ () => setModalContent( modalContent ) }
					nameButton={ text }
					buttonIcon={ renderIcon }
				/>
			) }
		</div>
	)
}

export default GroupBtn;