import React from 'react';
import Weights from './Weights';
import Tabs from './Tabs';
import Tara from './Tara';
import Print from './Print';
import Close from './CloseButton';
import Keyboard from './Keyboard';
import AppState from '../data.structure/App';

const app = AppState.getInstance();

const style: React.CSSProperties = {
    height: '100vh',
    background: 'yellow',
    textAlign: 'center',
};

function Main() {

    console.log("MAIN");

    return (
        <div style={style}>{JSON.stringify(app.getEnv())}
            {/* <Weights />
            <Tabs />
            <Tara />
            <Print /> */}
            <Close />
            {/* <Keyboard /> */}
        </div>
    );
}

export default Main;
