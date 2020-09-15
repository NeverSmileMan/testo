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

interface IStateApp {
    state: AppState;
    themeName: ThemesNames;
    maxOrdersCount: number;
    setEnvironment: (rect: DOMRect) => void;
}

const getState = () => ({
    state: app.getState(),
    themeName: app.getConfig().themeName,
    maxOrdersCount: app.getConfig().maxOrdersCount,
    setEnvironment: (rect: DOMRect) => app.setEnvironment(rect),
});

let setState: React.Dispatch<() => IStateApp>;
let state: IStateApp;
function changeState() {
    app.onChange(() => setState(getState));
    return getState();
}

function AppComponent() {
    
    [state, setState] = useState(changeState);

    return (
        state.state === AppState.INIT ?
            <SetEnvironment setEnvironment={state.setEnvironment}/> : (
            <ThemeProvider theme={themes[state.themeName]}>
                <Main maxOrdersCount={state.maxOrdersCount}/>
            </ThemeProvider>
    ));
}

export default withStyles(styles)(AppComponent);
