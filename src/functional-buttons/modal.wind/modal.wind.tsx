import React from 'react';
import { makeStyles } from '@material-ui/styles';



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
  content: JSX.Element | null;
}
const ModalWindow = ({ content }: Prop) => {
  const cls = useStyles();
  return content && (
    <div className={cls.back}>
      { content}
    </div>
  )
}

export default ModalWindow;