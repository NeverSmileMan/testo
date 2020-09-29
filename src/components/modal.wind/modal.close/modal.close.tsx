import React, { useCallback } from 'react';
import { useStyles } from './modal.close.style';

interface CloseProp {
  title?: string;
  confirm?: string;
  reject?: string;
  modalClose: () => void;
  deleteTab: (id: number | null ) => void;
  submitValueCalc?: (num: number) => void;
  activeTab: number | null;
}

const titleModal: string = 'Ви хочете остаточно закрити замовлення?';
const modalConfirm: string = 'Так';
const modalReject: string = 'Ні';

export const ModalClose = ({
  title = titleModal,
  confirm = modalConfirm,
  reject = modalReject,
  deleteTab,
   activeTab,
  modalClose }: CloseProp) => {

	const clss = useStyles();
	const confirmClose = useCallback( () => {
		deleteTab( activeTab );
		modalClose();
	}, [ deleteTab, modalClose, activeTab ] )

  return (
    <div className={clss.modal}>
      <div className={clss.title}>{title}</div>
      <div className={clss.btns}>
        <button onClick={confirmClose} className={clss.btn}>{confirm}</button>
        <button onClick={modalClose} className={clss.btn}>{reject}</button>
      </div>
    </div>
  )
}
