import React from 'react';
import { useTheme, makeStyles  } from '@material-ui/core/styles';
import {ActiveInputServise} from './services/ActiveInputServise';
import KeyboardGrid from './keyboard/keyboard';
import {keyBoard} from './keyboard/settings';
import KeyboardFlex from './keyboard.flex/keyboard.flex';
import {keyBoardFlex} from './keyboard.flex/settings.flex';
import Main from './main';


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
      '#root': {
        width: '100%',
        height: '100%',
      },
      'html, body': {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
      }
    },
  });


function App() {

	const classes = useStyles();

  
  return (
      <>
        <div className={classes.scale}>
        </div>
        <div className={classes.mainWrap}>
          <div className={`${classes.main}`}>
            <Main />
          </div>
          <div className={classes.keyboardWrap}>
            <KeyboardGrid service={ActiveInputServise} keyboardLayout={keyBoard}/>
            {/* <KeyboardFlex service={ActiveInputServise} keyboardLayout={keyBoardFlex}/> */}
          </div>
        </div>
     </>
  );
}


export default App;
