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

/*---------------- Control --------------------------------=*/

rikAppControl.runRikAppControl();

/*-----------------------------------------------------------|
| SHIFT + T > переключення теми                              |
| SHIFT + Z > імітація стабільності вагів                    |
| SHIFT + M > імітація повідомлення                          |
| SHIFT 0-1 > задата фактичну вагу                           |
|------------------------------------------------------------|
| a-z, enter, backspace, space, 0-9: ввід в активний інпут   |
-------------------------------------------------------------*/

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
