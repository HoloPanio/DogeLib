import { MessageController } from "../../controllers/MessageController";

export type MessageTokenType = 
	| 'text'
	| 'mention'
	| 'link'
	| 'emote'
	| 'block'

export interface QueuedMessageObject {
	ref: string,
	resolve: Promise<MessageController>
}

export interface SendChatMessageOptions {
}