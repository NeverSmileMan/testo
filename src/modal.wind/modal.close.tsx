import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  modal: {
    backgroundColor: '#fff',
    width: '550px',
    height: '300px',
    borderRadius: '10px',
    fontSize: '30px',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    opacity: '1',
    margin: '0 auto',
    transform: 'translateY(50%)',
  },
  title: {
    padding: '40px',
    textAlign: 'center',
  },
  btns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50px',
    width: '160px',
    border: '1px solid #000',
    borderRadius: '17px',
  }
})
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
  },[deleteTab,modalClose])
  
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