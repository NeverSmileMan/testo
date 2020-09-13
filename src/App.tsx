import React, { useState } from 'react';
import 'fontsource-roboto';
import { ThemeProvider } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import themes, { ThemesNames } from './themes/themes';
import App from './data.structure/App';
import { AppState } from './data.structure/types/types';
import SetEnvironment from './components/SetEnvironment';
import Main from './components/Main';
import './functions/rikAppTest.js';

const styles = createStyles((theme: Theme) => ({
    '@global': {
        'html, body': {
            fontSize: '18px',
            fontFamily: 'Roboto',
            margin: '0',
        },
        '*': {
            boxSizing: 'border-box',
        },
        '::-webkit-scrollbar': {
            width: '2.2rem',
        },
        '::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 0.3rem #e4e4e4',
        },
        '::-webkit-scrollbar-thumb': {
            background: '#fff',
            borderRadius: '0 1rem 1rem 0',
            border: '1px solid gray',
            borderLeft: 'none' ,
        },
    },
}));

const app = App.getInstance();

let setState: React.Dispatch<
    () => { state: AppState, themeName: ThemesNames}>;

function changeState() {
    const getState = () => ({
        state: app.getState(),
        themeName: app.getConfig().themeName,
    });
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
