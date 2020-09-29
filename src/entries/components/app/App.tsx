import React, { useState } from 'react';
import { ActiveInputService } from '../../../enum/ActiveInputService';
import { KeyboardMain } from '../../../components/keyboard/keyboard.main/keyboard.main';
import { keyboardSettings } from '../../../components/keyboard/keyboard.main/keyboard.settings';
import Main from '../main/main';
import { HintsProvider } from '../../../components/hint/hint.provider';
import OnKeyDownHandler from '../../../components/on.key.down.handler/on.key.down.handler';
import { ThemeProvider } from '@material-ui/core/styles';
import { useStylesApp } from './app.styles';
import { themes } from './app.themes';
import '../../../enum/i18n.init';
import { useTranslation } from 'react-i18next';
//-----
import { Tablo } from '../../../enum/Tablo';
//-----

function App() {
	const classes = useStylesApp();
	const [theme, setTheme] = useState(themes.default);
    const { t } = useTranslation();
	return (
		<OnKeyDownHandler>
			<ThemeProvider theme={theme}>
				<HintsProvider>
					<div className={classes.scale}>
						<div style={{ display: 'inlie-block' }}>
							<button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.default)}>
								{t('DEFAULT')}
							</button>
							<button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.silpo)}>
                                {t('SILPO')}
							</button>
							<button style={{ display: 'inlie-block' }} onClick={() => setTheme(themes.fora)}>
								{t('FORA')}
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
