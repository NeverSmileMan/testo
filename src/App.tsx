import React, { useState } from 'react';
import AppObject from './data.structure/App';
import { AppStateTypes } from './data.structure/types';

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
            <div style={{height: '100vh', background: 'yellow'}}>{JSON.stringify(app.getEnv())}</div>
    );
}


function SetEnv(): React.ReactElement {
    const ref: React.RefObject<HTMLDivElement> = React.useRef(null);

    React.useLayoutEffect(
        () => {
            const elem: HTMLDivElement = ref.current!;
            const rect: DOMRect = elem.getBoundingClientRect();
            app.setEnv(rect);
    }, []);

    return (
        <div ref={ref} style={{height: '100vh', background: 'green'}}>INIT APP</div>
    );
}

export default App;
