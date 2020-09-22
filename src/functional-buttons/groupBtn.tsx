import React, { useContext, useMemo } from 'react';
import { ModalContext } from '../modal.context';
import Button from './button/button';
import Speed from '@material-ui/icons/Speed';
import Print from '@material-ui/icons/Print';
import ModalTara from './modal.wind/modal.tara';
import ModalClose from './modal.wind/modal.close';
import ModalPrint from './modal.wind/modal.print';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/styles';
import { MainContext } from '../main/main';

const useStyles = makeStyles({
  btns: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
})

const GroupBtn = () => {
  const cls = useStyles();
  const { setModalContent } = useContext(ModalContext);
  const { submitValueCalc, confirmClose, print } = useContext(MainContext);

  const buttons = useMemo(()=>[
    {
      type: 'tara',
      text: 'тара',
      renderIcon: () => (<Speed />),
      modalContent: <ModalTara submitValueCalc={submitValueCalc} modalClose={() => setModalContent(null)}/>
    },
    {
      type: 'print',
      text: 'друк',
      renderIcon: () => (<Print />),
      modalContent: <ModalPrint print={ print }/>,
    },
    {
      type: 'close',
      text: 'закрити',
      renderIcon: () => (<CheckCircle />),
      modalContent: <ModalClose confirmClose={confirmClose} modalClose={() => setModalContent(null)}/>,
    }
  ],[submitValueCalc, confirmClose, setModalContent, print])

  return (
    <div className={cls.btns}>
      {buttons.map(({ text, modalContent, renderIcon }) =>
        <Button
          key={text}
          click={() => setModalContent(modalContent)}
          nameButton={text}
          buttonIcon={renderIcon}
        />
      )}
    </div>
  )
}

export default GroupBtn;