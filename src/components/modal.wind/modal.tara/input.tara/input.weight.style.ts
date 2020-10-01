import {makeStyles} from '@material-ui/styles';

export const useStyle = makeStyles({
    inputContainer: {
      width: '310px',
      marginRight: '12px',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
    },
    keyboardContainer: {
      display: 'grid',
      gridTemplateColumns: '9fr 3fr',
      marginLeft: '15px',
      justifyContent: 'center',
    }
  })