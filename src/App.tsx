import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import themes, { ThemesNames } from './themes/themes';
import styles from './styles/App';
import App from './data.structure/App';
import { AppState } from './data.structure/types/types';
import SetEnvironment from './components/SetEnvironment';
import Main from './components/Main';
import './functions/rikAppTest.js';

const app = App.getInstance();

const getState = () => ({
    state: app.getState(),
    themeName: app.getConfig().themeName,
});

let setState: React.Dispatch<
    () => { state: AppState, themeName: ThemesNames}>;

function changeState() {
    app.onChange(() => setState(getState));
    return getState();
}

function AppComponent() {
    let state:AppState, themeName: ThemesNames;
    [
        { state, themeName },
        setState,
    ] = useState(changeState);

    return (
        state === AppState.INIT ?
            <SetEnvironment /> : (
            <ThemeProvider theme={themes[themeName]}>
                <Main />
            </ThemeProvider>
    ));
}

export default withStyles(styles)(AppComponent);
