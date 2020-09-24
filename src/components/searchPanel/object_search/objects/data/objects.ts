interface IObject<StateObject> {
    onChange: (callback: (getState: () => StateObject) => void) => void;
    getStateObject: () => StateObject;
}

export default IObject;
