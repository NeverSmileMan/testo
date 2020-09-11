import React, { useState } from 'react';
import 'fontsource-roboto';
import App from './data.structure/App';
import { AppState } from './data.structure/types/types';
import { ThemeProvider } from '@material-ui/core';
import themes from './themes/themes';
import SetEnvironment from './components/SetEnvironment';
import Main from './components/Main';
import './functions/rikAppTest.js';

const app = App.getInstance();
function changeState() {
    const state = app.getState();
    const themeName = app.getConfig().themeName;
    return { state, themeName }
}

function AppComponent() {
    const [{ state, themeName }, setState] = useState(() => {
        app.onChange(
            () => setState(() => changeState())
        );
        return changeState();
    });

    return (
        state === AppState.INIT ?
            <SetEnvironment /> : (
            <ThemeProvider theme={themes[themeName]}>
                <Main />
            </ThemeProvider>
    ));
}

export default AppComponent;
