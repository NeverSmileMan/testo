import React, { useContext } from 'react';
import Button from './button/button';
import Speed from '@material-ui/icons/Speed';
import Print from '@material-ui/icons/Print';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/styles';
import { MainContext } from '../main/main';

const buttons = [
  {
    type: 'tara',
    text: 'тара',
    renderIcon: () => (<Speed />)
  },
  {
    type: 'print',
    text: 'друк',
    renderIcon: () => (<Print />)
  },
  {
    type: 'close',
    text: 'закрити',
    renderIcon: () => (<CheckCircle />)
  }
]

const useStyles = makeStyles({
  btns: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
})

const GroupBtn = () => {
  const cls = useStyles();
  const { setType } = useContext(MainContext)
  return (
    <div className={cls.btns}>
      {buttons.map((val) =>
        <Button
          key={val.text}
          click={setType(val.type)}
          nameButton={val.text}
          buttonIcon={val.renderIcon}
        />
      )}
    </div>
  )
}

export default GroupBtn;