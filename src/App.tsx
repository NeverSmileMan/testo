import React, { useState, useLayoutEffect } from 'react';
import AppObject, { IAppStatePartial} from './data.structure/App';
import { AppStateTypes } from './data.structure/types/types';
import SetEnvironment from './components/SetEnvironment';
import Main from './components/Main';
import 'fontsource-roboto';
import './functions/rikAppTest.js';
import { ThemeProvider } from '@material-ui/core';
import themes from './themes/themes';

const app = AppObject.getInstance();

function App() {
    const [{ state, theme }, setState] = useState(() => {
        app.onStateChange(() => setState(() => app.getStatePartial()));
        return app.getStatePartial();
    });

    return (
        state === AppStateTypes.INIT ?
            <SetEnvironment /> : (
            <ThemeProvider theme={themes[theme]}>
                <Main />
            </ThemeProvider>
    ));
}

export default App;
