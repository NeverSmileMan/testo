import React from 'react';
import AppState from '../data.structure/App';

const app = AppState.getInstance();

function SetEnv(): React.ReactElement {
    const ref: React.RefObject<HTMLDivElement> = React.useRef(null);

    React.useLayoutEffect(
        () => {
            const elem: HTMLDivElement = ref.current!;
            const rect: DOMRect = elem.getBoundingClientRect();
            app.setEnv(rect);
    }, []);

    return (
        <div ref={ref} className='app-init'>INIT APP</div>
    );
}

export default SetEnv;
