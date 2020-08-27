export enum MessageType {
    INFO,
    WARNING,
    ERROR,
}

export class Message {
    public text: string;
    public type: MessageType;

    constructor(text: string, type: MessageType) {
        this.text = text;
        this.type = type
    }
}
