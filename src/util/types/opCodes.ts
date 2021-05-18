import { 
	AuthPayloadSchema, 
	GetBannedUsersPayloadSchema, 
	GetRoomInfoPayloadSchema, 
	GetTopRoomsPayloadSchema, 
	GetUserInfoPayloadSchema, 
	JoinRoomPayloadSchema, 
	LeaveRoomPayloadSchema, 
	LegacyJoinRoomPayloadSchema 
} from "../payloadSchemas";
import { SendChatMessagePayloadSchema } from "../payloadSchemas/chat";

import { 
	GetBannedUsersResponseSchema,
	GetTopRoomsResponseSchema,
	LeaveRoomResponseSchema,
	LegacyRoomInfoResponseSchema, 
	RoomInfoResponseSchema,
} from "../responseSchemas";
import { ReceivedMessageSchema } from "../responseSchemas/chat";

import { BaseUserInfo } from "./user";

export const OpCode = {
	USER: {
		GET_INFO: "user:get_info"
	},
	
	ROOM: {
		GET_TOP: "room:get_top",
		GET_INFO: "room:get_info",

		GET_BANNED_USERS: "room:get_banned_users",

		JOIN_GET_INFO: "join_room_and_get_info", // Legacy

		JOIN: "room:join",
		LEAVE: "room:leave"
	},

	CHAT: {
		SEND_MSG: "chat:send_msg",
		NEW_CHAT_MESSAGE: "new_chat_msg",
	},

	AUTH: {
		REQUEST: "auth:request",
		REPLY: "auth:request:reply"
	},

	LEGACY: {
		FETCH_DONE: 'fetch_done'
	}
} as const;

/**
 * Socket Interactions
 */
export interface OpCodePayload {
	/**
	 * USER OP CODES
	 */
	[OpCode.USER.GET_INFO]: GetUserInfoPayloadSchema;
	
	/**
	 * ROOM OP CODES
	 */
	[OpCode.ROOM.GET_INFO]: GetRoomInfoPayloadSchema;
	[OpCode.ROOM.GET_TOP]: GetTopRoomsPayloadSchema;
	
	[OpCode.ROOM.GET_BANNED_USERS]: GetBannedUsersPayloadSchema;

	[OpCode.ROOM.JOIN_GET_INFO]: LegacyJoinRoomPayloadSchema
	
	[OpCode.ROOM.JOIN]: JoinRoomPayloadSchema;
	[OpCode.ROOM.LEAVE]: LeaveRoomPayloadSchema;

	/**
	 * CHAT OP CODES
	 */
	[OpCode.CHAT.SEND_MSG]: SendChatMessagePayloadSchema;

	/**
	 * AUTH OP CODES
	 */
	[OpCode.AUTH.REQUEST]: AuthPayloadSchema;
}
export interface OpCodeResponse {
	/**
	 * USER OP CODES
	 */
	[OpCode.USER.GET_INFO]: SocketMessage<BaseUserInfo>

	/**
	 * ROOM OP CODES
	 */
	[OpCode.ROOM.GET_INFO]: SocketMessage<RoomInfoResponseSchema>;
	[OpCode.ROOM.GET_TOP]: SocketMessage<GetTopRoomsResponseSchema>,

	[OpCode.ROOM.GET_BANNED_USERS]: SocketMessage<GetBannedUsersResponseSchema>;

	[OpCode.ROOM.JOIN_GET_INFO]: LegacySocketMessage<LegacyRoomInfoResponseSchema>
	
	[OpCode.ROOM.JOIN]: SocketMessage<RoomInfoResponseSchema>;
	[OpCode.ROOM.LEAVE]: SocketMessage<LeaveRoomResponseSchema>;

	/**
	 * CHAT OP CODES
	 */
	[OpCode.CHAT.SEND_MSG]: SocketMessage<void>;

	/**
	 * AUTH OP CODES
	 */	
	[OpCode.AUTH.REQUEST]: SocketMessage<BaseUserInfo>
}
export interface OpCodeEvents {
	[OpCode.AUTH.REPLY]: (msg: SocketMessage<BaseUserInfo>) => void;

	[OpCode.CHAT.NEW_CHAT_MESSAGE]: (msg: LegacySocketMessage<ReceivedMessageSchema>) => void;
}

export type AccessToken = string;
export type RefreshToken = string;

export interface SocketMessage<Payload> {
	e? : any,
	op: string,
	p: Payload,
	ref: string,
	v: string,

	d?: Payload,
}

export interface LegacySocketMessage<Payload> {
	op: string;
	d?: Payload;
	fetchId?: string | null;
}

export interface SendApiPayloadOptions{
	expectedResponseCode: string
}