import { useState } from 'react';
import App, { IAppTest, IStateApp } from '../data.structure/App';
import { appControl } from '../functions/rikAppTest';

function createStateApp(app: IAppTest, setStateApp: React.Dispatch<() => IStateApp>) {
    appControl(app);
    app.onChange(() => setStateApp(app.getStateApp));
    return app.getStateApp();
}

const useApp = () => {
    const app = new App();
    const [stateApp, setStateApp] = useState(app.getStateApp);
    useState(() => createStateApp(app, setStateApp));
    return stateApp;
};

export default useApp;
