import React, { useCallback } from 'react';
import { useStyles } from './modal.close.style';

interface CloseProp {
  title?: string;
  confirm?: string;
  reject?: string;
  modalClose: () => any;
  deleteTab: () => void;
  submitValueCalc?: (num: number) => void;
}

const titleModal: string = 'Ви хочете остаточно закрити замовлення?';
const modalConfirm: string = 'Так';
const modalReject: string = 'Ні';

const ModalClose = ({
  title = titleModal,
  confirm = modalConfirm,
  reject = modalReject,
  deleteTab,
  modalClose }: CloseProp) => {

  const clss = useStyles();
  const confirmClose = useCallback(() => {
    deleteTab();
    modalClose();
  }, [deleteTab, modalClose])

  return (
    <div className={clss.modal}>
      <div className={clss.title}>{title}</div>
      <div className={clss.btns}>
        <div onClick={confirmClose} className={clss.btn}>{confirm}</div>
        <div onClick={modalClose} className={clss.btn}>{reject}</div>
      </div>
    </div>
  )
}

export default ModalClose;