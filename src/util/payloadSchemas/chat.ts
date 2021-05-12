import { MessageToken } from "kefler";


export interface SendChatMessagePayloadSchema {
	tokens?: MessageToken[];
	whisperedTo?: string[];
	isWhisper?: boolean;	
}