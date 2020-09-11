import React from 'react';
import PrintObject from '../../data.structure/Print';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    modal: {
      backgroundColor: 'lightgrey',
      width: '40%',
      height: '300px',
      borderRadius: '10px',
      fontSize: '30px',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      opacity: '1',
      margin: '0 auto',
      //transform: 'translateY(50%)',
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
      width: '90px',
      border: '1px solid #000',
      borderRadius: '8px',
    }
  })
  interface PrintProp {
    title?: string;
    confirm?: string;
    reject?: string;
  }

const titleModal: string = 'Роздрукувати замовлення?';
const modalConfirm: string = 'Так';
const modalReject: string = 'Ні';

const print = PrintObject.getInstance();

const onClickTrue = () => {
    print.doPrint(true);
};

const onClickFalse = () => {
    print.doPrint(false);
};

function PrintModal({ title = titleModal, confirm = modalConfirm, reject = modalReject }: PrintProp) {
    const clss = useStyles();
    return (
        // <div
        //     className='print modal'
        //     onClick={onClick}>
        //     PRINT MODAL
        // </div>
        <div className={clss.modal}>
        <div className={clss.title}>{title}</div>
        <div className={clss.btns}>
            <div className={clss.btn} onClick={onClickTrue}>{confirm}</div>
            <div className={clss.btn} onClick={onClickFalse}>{reject}</div>
        </div>
    </div>
    );
}

export default PrintModal;
