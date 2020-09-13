export enum Mode {
    BUTTON,
    MODAL,
}

export enum State {
    ENABLED,
    DISABLED,
    PENDING,
    READY,
}

export enum AppState {
    INIT,
    RUN,
    STOP,
}

export enum EventType {
    STATE_CHANGE = 'stateChange',
}