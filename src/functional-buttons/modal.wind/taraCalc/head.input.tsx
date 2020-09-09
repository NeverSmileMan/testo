import React from 'react';
import { makeStyles, Theme, createStyles  } from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) => createStyles ({
  input: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    height: '30px',
  },
  head:{
    display: 'flex',
    justifyContent: 'space-between;',
    marginBottom: '15px',
  },
  inputHead:{
    backgroundColor: theme.palette.primary.main,
    height: '110px',
    padding: '0 10px',
    borderRadius: '10px 10px 0 0',
  }
}))

const InputHead = () => {
  const {input, head, inputHead} = useStyle();
  return (
    <div className={inputHead}>
      <div className={head}>
        <div>Тара</div>
        <div>&#10005;</div>
      </div>
      <div className={input}>
        <div></div>
      </div>
    </div>
  )
}

export default InputHead;