import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import ModalTara from './modal.tara';
import ModalPrint from './modal.print';
import ModalClose from './modal.close';
import ModalQtyGoods from './modal.qty.goods';
import {MainContext} from '../../main';



const useStyles = makeStyles({
  back: {
    backgroundColor: 'rgb(0,0,0,0.8)',
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: '0',
    top: '0'
  }
})
interface Prop {
  type: string;
  click: () => any;
}
const ModalWindow = () => {
  const cls = useStyles();
  const {modalType} = useContext(MainContext)
  
  const modal: { [key: string]: any } = {
    tara: () => (<ModalTara/>),
    print: () => (<ModalPrint />),
    close: () => (<ModalClose/>),
    qtyGoods: () => (<ModalQtyGoods callback={modalType.callback}/>)
  }
  console.log(modalType.callback)
  return (
    <>
    {modalType.type ?
      <div className={cls.back}>
        {
          modalType.type && modal[modalType.type]()
        }
      </div>
       : null}
    </>
  )
}

export default ModalWindow;