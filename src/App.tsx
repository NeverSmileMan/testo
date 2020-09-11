import React, { useState } from 'react';
import AppState from './data.structure/App';
import { AppStateTypes } from './data.structure/types/types';
import SetEnvironment from './components/SetEnvironment';
import Main from './components/Main';
import 'fontsource-roboto';
import './functions/rikAppTest.js';
import { ThemeProvider, Theme } from '@material-ui/core';
import themes, { ThemesNames } from './themes/themes';

const app = AppState.getInstance();

function App() {
    const [, setState] = useState({});

    useState(() => {
        app.onStateChange(() =>
            setState({}))
    });

    const init = app.getStateType() === AppStateTypes.INIT || false;
    const theme: Theme = themes[app.getConfigPar('themeName') as ThemesNames];
    
    return (
        init ?
            <SetEnvironment /> :
            (<ThemeProvider theme={theme}>
                <Main />
            </ThemeProvider>)
    );
}

export default App;
