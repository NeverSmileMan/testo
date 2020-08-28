import React, { useState } from 'react';
import AppObject from './data.structure/App';
import { AppStateTypes } from './data.structure/types';
import SetEnv from './Components/SetEnv';
import Modal from './Components/Modal';

const app = AppObject.getInstance();

function App() {
    const [, setState] = useState({});

    useState(() => {
        app.onStateChange(() =>
            setState({}))
    });

    const init = app.getStateType() === AppStateTypes.INIT || false;

    return (
        init ?
            <SetEnv /> :
            (<>
                <div style={{height: '100vh', background: 'yellow'}}>{JSON.stringify(app.getEnv())}</div>
                <Modal />
            </>)
    );
}

export default App;
