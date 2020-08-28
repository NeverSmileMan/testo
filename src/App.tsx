import React, { useState } from 'react';
import AppState from './data.structure/App';
import { AppStateTypes } from './data.structure/types';
import SetEnv from './Components/SetEnv';
import Modal from './Components/Modal';
import Main from './Components/Main';

const app = AppState.getInstance();

function App() {
    const [, setState] = useState({});

    useState(() => {
        app.onStateChange(() =>
            setState({}))
    });

    const init = app.getStateType() === AppStateTypes.INIT || false;

    return (init ?
        <SetEnv /> : 
        (<>
            <Main />
            <Modal />
        </>)
    );
}

export default App;
