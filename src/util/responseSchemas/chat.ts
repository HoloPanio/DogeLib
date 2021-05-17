import { MessageToken } from 'kefler';

export interface RawMessage {
	avatarUrl: string,
	displayName: string,
	id: string,
	isWhisper: boolean,
	sentAt: string,
	tokens: MessageToken[],
	userId: string,
	username: string
}

export interface ReceivedMessageSchema {
	msg: RawMessage,
	userId: string
}