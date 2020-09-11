import React, { useState } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { ActiveInputService } from './services/ActiveInputService';
import KeyboardGrid from './keyboard/keyboard';
import { keyBoard } from './keyboard/settings';
import KeyboardFlex from './keyboard.flex/keyboard.flex';
import { keyBoardFlex } from './keyboard.flex/settings.flex';
import Main from './main';

//-----
import Tablo from './plugs/Tablo';
//-----

const useStyles = makeStyles({
  scale: {
    width: '100%',
    height: '15.8854%',
    backgroundColor: 'gray',
    display: 'flex',
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
      fontFamily: 'Arial',
      fontSize: '24px',
    }
  },
});

type ThemesObj = {
	[property: string] : Theme;
}
const themes: ThemesObj = {};

themes.default = createMuiTheme({
  palette: {
    primary: {
      main: '#0099FF',
    },
    secondary: {
      main: '#d7d7d7',
    },
  },
});
themes.silpo = createMuiTheme({
  palette: {
    primary: {
      main: '#ff8522',
    },
    secondary: {
      main: '#d7d7d7',
    },
  },
});
themes.fora = createMuiTheme({
  palette: {
    primary: {
      main: '#76b72f',
    },
    secondary: {
      main: '#ef036',
    },
  },
});

function App() {
  const classes = useStyles();
  const [theme, setTheme] = useState(themes.default);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.scale}>
          <div style={{ display: 'inlie-block' }}>
            <button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.default)}>DEFAULT</button>
            <button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.silpo)}>SILPO</button>
            <button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.fora)}>FORA</button>
          </div>
          <Tablo />
        </div>
        <div className={classes.mainWrap}>
          <div className={`${classes.main}`}>
            <Main />
          </div>
          <div className={classes.keyboardWrap}>
            <KeyboardGrid service={ActiveInputService} keyboardLayout={keyBoard} />
            {/* <KeyboardFlex service={ActiveInputService} keyboardLayout={keyBoardFlex}/> */}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
