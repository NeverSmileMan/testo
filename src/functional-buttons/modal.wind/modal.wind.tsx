import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import ModalTara from './modal.tara';
import ModalPrint from './modal.print';
import ModalClose from './modal.close';
import {MainContext} from '../../main'



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
  const modal: { [key: string]: any } = {
    tara: () => (<ModalTara/>),
    print: () => (<ModalPrint />),
    close: () => (<ModalClose/>),
  }
  const cls = useStyles();
  const {modalType} = useContext(MainContext)
  
  return (
    <>
      <div className={cls.back}>
        {
          modalType && modal[modalType] && modal[modalType]()
        }
      </div>
    </>
  )
}

export default ModalWindow;