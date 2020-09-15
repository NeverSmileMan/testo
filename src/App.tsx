import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import themes from './themes/themes';
import styles from './styles/App';
import App, { IStateApp } from './data.structure/App';
import { AppState } from './data.structure/types/types';
import SetEnvironment from './components/SetEnvironment';
import Main from './components/Main';
import rikAppTest from './functions/rikAppTest.js';

let setState: React.Dispatch<() => IStateApp>;
let state: IStateApp;
function changeState() {
    const app = new App();
    rikAppTest(app);
    app.onChange(() => setState(app.getStateApp));
    return app.getStateApp();
}

function AppComponent() {
    [state, setState] = useState(changeState);
    return (
        state.state === AppState.INIT ?
            <SetEnvironment setEnvironment={state.setEnvironment}/> : (
            <ThemeProvider theme={themes[state.themeName]}>
                <Main maxOrdersCount={state.maxOrdersCount} weights={state.weights}/>
            </ThemeProvider>
    ));
}

export default withStyles(styles)(AppComponent);
