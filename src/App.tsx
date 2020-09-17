import React from 'react';
import SetEnvironment from './components/SetEnvironment';
import { ThemeProvider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import themes from './themes/themes';
import styles from './styles/App';
import { AppState } from './data.structure/types/types';
import useApp from './hooks/App';
import Main from './components/Main';
import rikAppControl from './functions/rikAppControl';
import ErrorBoundary from './components/errors/error';

rikAppControl.runRikAppControl();

function AppComponent() {
    const { state, setEnvironment, themeName, maxOrdersCount} = useApp();
    return (
        state === AppState.INIT ?
            <SetEnvironment setEnvironment={setEnvironment}/> : (
            <ThemeProvider theme={themes[themeName]}>
                <Main maxOrdersCount={maxOrdersCount} />
            </ThemeProvider>
    ));
}

export default withStyles(styles)(AppComponent);
