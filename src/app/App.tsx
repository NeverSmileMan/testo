import React, { useState } from 'react';
import { ActiveInputService } from '../services/ActiveInputService';
import KeyboardMain from '../components/keyboard/keyboard.main/keyboard.main';
import { keyboardSettings } from '../components/keyboard/keyboard.main/keyboard.settings';
import Main from '../main/main';
import HintsProvider from '../tabs/hint/hint.provider';
import OnKeyDownHandler from '../components/onKeyDownHandler/onKeyDownHandler';
import { ThemeProvider } from '@material-ui/core/styles';
import { useStylesApp } from './app.styles';
import { themes } from './app.themes';
//-----
import Tablo from '../plugs/Tablo';
//-----

function App() {
	const classes = useStylesApp();
	const [theme, setTheme] = useState(themes.default);

	return (
		<OnKeyDownHandler>
			<ThemeProvider theme={theme}>
				<HintsProvider>
					<div className={classes.scale}>
						<div style={{ display: 'inlie-block' }}>
							<button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.default)}>
								DEFAULT
							</button>
							<button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.silpo)}>
								SILPO
							</button>
							<button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.fora)}>
								FORA
							</button>
						</div>
						<Tablo />
					</div>
					<div className={classes.mainWrap}>
						<div className={`${classes.main}`}>
							<Main />
						</div>
						<div className={classes.keyboardWrap}>
							<KeyboardMain service={ActiveInputService} keyboardLayout={keyboardSettings} />
						</div>
					</div>
				</HintsProvider>
			</ThemeProvider>
		</OnKeyDownHandler>
	);
}

export default App;
