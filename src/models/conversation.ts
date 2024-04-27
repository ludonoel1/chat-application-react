export interface IConversation {
    id: number,
    name: string,
    picture: string,
    chatlog: IMessage[]
}

export interface IMessage{
    message_id: number,
    sender: Sender,
    text: string,
    timestamp: string
}

export enum Sender {
    RECEIVER = 0,
    SENDER = 1
}