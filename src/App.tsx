import React from 'react';
import { useTheme, makeStyles  } from '@material-ui/core/styles';


const useStyles = makeStyles({
	scale: {
    width: '100%',
    height: '15.8854%',
  },
	mainWrap: {
    width: '100%',
    height: '84.1146%',
  },
	main: {
    width: '100%',
    height: '70%',
  },
	keyboardWrap: {
    width: '100%',
    height: '30%',
  },
    '@global': {
      '::-webkit-scrollbar': {
        width: '40px',
      },
      '::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 5px #e4e4e4',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#fff',
        borderRadius: '10px',
      },
    },
    '#root': {
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
    }
  });


function App() {


	const classes = useStyles();

  


  return (
      <>
        <div className={classes.scale}>
        </div>
        <div className={classes.mainWrap}>
          <div className={classes.main}>

          </div>
          <div className={classes.keyboardWrap}>

          </div>
        </div>
     </>
  );
}



export default App;
