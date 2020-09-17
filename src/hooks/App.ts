import { useState } from 'react';
import App, { IAppTest, IStateApp } from '../data.structure/App';

function createMethods(
    app: IAppTest,
    setStateApp: React.Dispatch<() => IStateApp>
) {
    app.onChange(setStateApp);
}

const useApp = () => {
    const [app] = useState(App.getInstance);
    const [stateApp, setStateApp] = useState(app.getStateApp);
    useState(() => createMethods(app, setStateApp));
    return stateApp;
};

export default useApp;
