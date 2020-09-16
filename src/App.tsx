import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import themes from './themes/themes';
import styles from './styles/App';
import App, { IStateApp } from './data.structure/App';
import { AppState } from './data.structure/types/types';
import SetEnvironment from './components/SetEnvironment';
import Main from './components/Main';
import { appControl } from './functions/rikAppTest';

let setStateApp: React.Dispatch<() => IStateApp>;
let stateApp: IStateApp;
function createStateApp() {
    const app = new App();
    appControl(app);
    app.onChange(() => setStateApp(app.getStateApp));
    return app.getStateApp();
}

function AppComponent() {
    [stateApp, setStateApp] = useState(createStateApp);
    const { setEnvironment, themeName, maxOrdersCount} = stateApp;
    return (
        stateApp.state === AppState.INIT ?
            <SetEnvironment setEnvironment={setEnvironment}/> : (
            <ThemeProvider theme={themes[themeName]}>
                <Main maxOrdersCount={maxOrdersCount} />
            </ThemeProvider>
    ));
}

export default withStyles(styles)(AppComponent);
