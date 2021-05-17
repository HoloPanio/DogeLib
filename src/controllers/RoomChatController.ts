import { Client } from "../Client";
import config from '../config';
import { RawMessage } from '../util/responseSchemas/chat';
import { ERROR } from '../util/constraints';
import { QueuedMessageObject, SendChatMessageOptions } from "../util/types/chat";
import { OpCode } from "../util/types/opCodes";
import { MessageController } from "./MessageController";
import { RoomController } from "./RoomController";
import { kefler, Unitoken, MessageToken } from 'kefler';
import Queue from 'doge-queue';
import { EventEmitter } from "stream";

export declare interface RoomChatController {
	on (e: 'new_message_raw', callback: (msg: RawMessage) => void): this;
	on (e: 'new_message', callback: (msg: MessageController) => void): this;
}

export class RoomChatController extends EventEmitter {

	public client: Client;
	
	#_room: RoomController;
	#_messageQueue = new Queue<QueuedMessageObject>((message) => this._sendChatMessage(message), config.chat_default_message_delay);

	get send_delay (): number {
		return this.#_messageQueue.delay;
	}

	set send_delay (new_delay: number) {
		this.#_messageQueue.delay = new_delay;
	}

	private _queueChatMessage(obj: QueuedMessageObject) {
		this.#_messageQueue.emit(obj);
	}

	private _sendChatMessage(obj: QueuedMessageObject) {
		obj.resolve();
	}

	constructor(room: RoomController, client: Client) {
		super();
		this.#_room = room;
		this.client = client;
		this.on('new_message_raw', (raw) => {
			const msgctrl = new MessageController(raw, this.client);
			this.emit('new_message', msgctrl);
			if ((raw.userId === this.client.bot?.id) && this.__ownMessageCallback) {
				this.__ownMessageCallback({ msgctrl	});
				this.__ownMessageCallback = undefined; // Equivalent to `delete`
			}
		});
	}

	private __ownMessageCallback?: ({
		error,
		msgctrl,
	}: {
		error?: Error,
		msgctrl?: MessageController,
	}) => void;

	send(message: Array<Unitoken | MessageToken | string> | string, options?: SendChatMessageOptions): Promise<MessageController> {
		return new Promise((resolve, reject) => {
			const ref = this.client.randStr(64);
			const tokens: MessageToken[] = kefler.encode(message);

			this._queueChatMessage({
				ref,
				resolve: () => {
					if (this.__ownMessageCallback) this.__ownMessageCallback({ error: new Error(ERROR.CHAT.SEND_MESSAGE.NO_RESPONSE) });
					this.__ownMessageCallback = (({ error, msgctrl }) => {
						if (error) reject(error);
						else if (msgctrl) resolve(msgctrl);
						else reject(new Error(ERROR.CHAT.SEND_MESSAGE.NO_CONTROLLER));
					});
					this.client.api.fetch(OpCode.CHAT.SEND_MSG, {tokens}, {expectResponseData: false});
				},
			});
		});
	}
}