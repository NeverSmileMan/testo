import React from 'react';
import { makeStyles } from '@material-ui/styles';
import ModalTara from './modal.tara';
import ModalPrint from './modal.print';
import ModalClose from './modal.close';



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
  click: any;
}
const ModalWindow = ({ type, click }: Prop) => {
  const modalType: { [key: string]: any } = {
    tara: () => (<ModalTara click={click}/>),
    print: () => (<ModalPrint />),
    close: () => (<ModalClose click={click}/>),
  }
  const cls = useStyles();
  return (
    <>
      <div className={cls.back}>
        {
          modalType[type] && modalType[type]()
        }
      </div>
    </>
  )
}

export default ModalWindow;