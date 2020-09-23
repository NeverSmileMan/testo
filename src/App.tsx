import React, { useState, useCallback } from 'react';
import { makeStyles, ThemeProvider, createMuiTheme, Theme } from '@material-ui/core/styles';
import { ActiveInputService } from './services/ActiveInputService';
import KeyboardMain from './keyboard/keyboard.main/keyboard.main';
import { keyboardSettings } from './keyboard/keyboard.main/keyboard.settings';
import Main from './main';

//-----
import Tablo from './plugs/Tablo';
import {PopUpProvider} from './modal/provider';
import HintsProvider from './tabs/hint/hints.provider';

//-----

const useStyles = makeStyles({
	appWrap: {
		width: '100%',
		height: '100%',
	},
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
		},
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
  typography: {
    fontFamily: "'Arial','Helvetica', sans-serif"
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
  typography: {
    fontFamily: "'Arial','Helvetica', sans-serif"
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
  typography: {
    fontFamily: "'Arial','Helvetica', sans-serif"
  },
});
/* для onKeyDown*/
const arr_symb = ['!','@','#','$','*','(',')','_','`','^',';',':','[',']','{','}','<','>','\\','|','/',',','.',"'",'"','ContextMenu','№','%','&','?','-','+','=','~','Alt','Control','Meta','Shift','Enter','Escape','Tab','CapsLock','Delete','Insert','Home','End','PageUp','PageDown','Pause','ScrollLock','NumLock','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10','F11','F12'];
const set_symb = new Set(arr_symb);

function App() {
  const classes = useStyles();
  const [theme, setTheme] = useState(themes.default);

	const onKey = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Backspace') {
				ActiveInputService.delete(1);
			} else if (set_symb.has(e.key)) {
				e.preventDefault();
			} else {
				ActiveInputService.add(e.key);
			}
		},
	[],
)

  return (
    <PopUpProvider>
      <HintsProvider>
    <div className={classes.appWrap} onKeyDown={onKey} tabIndex={-1}>
      <ThemeProvider theme={theme}>
        <div className={classes.scale}>
          <div style={{ display: 'inlie-block' }}>
            <button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.default)}>DEFAULT</button>
            <button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.silpo)}>SILPO</button>
            <button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.fora)}>FORA</button>
          </div>
          <Tablo />
          {/* <InnerElement/> */}
        </div>
        <div className={classes.mainWrap}>
          <div className={`${classes.main}`}>
            <Main />
          </div>
          <div className={classes.keyboardWrap}>
            <KeyboardMain service={ActiveInputService} keyboardLayout={keyboardSettings}/>
          </div>
        </div>
      </ThemeProvider>
    </div>
    </HintsProvider>
    </PopUpProvider>
  );
}

export default App;
