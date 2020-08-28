import React from 'react';
import AppState from '../data.structure/App';

const app = AppState.getInstance();

const style: React.CSSProperties = {
    height: '100vh',
    background: 'green',
};

function SetEnv(): React.ReactElement {
    const ref: React.RefObject<HTMLDivElement> = React.useRef(null);

    React.useLayoutEffect(
        () => {
            const elem: HTMLDivElement = ref.current!;
            const rect: DOMRect = elem.getBoundingClientRect();
            app.setEnv(rect);
    }, []);

    return (
        <div ref={ref} style={style}>INIT APP</div>
    );
}

export default SetEnv;
