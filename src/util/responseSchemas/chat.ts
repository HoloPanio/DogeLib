import { MessageToken } from 'kefler';

export interface SendChatMessageResponseSchema {
	msg: {
		avatarUrl: string,
		displayName: string,
		id: string,
		isWhisper: boolean,
		sentAt: string,
		tokens: MessageToken[],
		userId: string,
		username: string
	},
	userId: string
}