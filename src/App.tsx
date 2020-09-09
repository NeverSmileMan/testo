import React, { useState } from 'react';
import AppState from './data.structure/App';
import { AppStateTypes } from './data.structure/types';
import SetEnv from './Components/SetEnv';
import Main from './Components/Main';
import './styles/index.scss';
import './data.structure/RikApp.js';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';

const app = AppState.getInstance();

function App() {
    const [, setState] = useState({});

    useState(() => {
        app.onStateChange(() =>
            setState({}))
    });

    const init = app.getStateType() === AppStateTypes.INIT || false;

    return (
        init ?
            <SetEnv /> :
            <ThemeProvider theme={theme}>
                <Main />
            </ThemeProvider>
    );
}

export default App;
