import { Client } from "../Client";
import { QueuedMessageObject, SendChatMessageOptions } from "../util/types/chat";
import { OpCode } from "../util/types/opCodes";
import { MessageController } from "./MessageController";
import { RoomController } from "./RoomController";
import { kefler, Unitoken, MessageToken } from 'kefler';
import Collection from "@discordjs/collection";
import { EventEmitter } from "stream";

export class RoomChatController {

	public client: Client;

	private _messageTimeout: number = 1000;
	private _internalMsgEventHandler: EventEmitter = new EventEmitter();

	#_room: RoomController;
	#_messageQueue: Collection<string, QueuedMessageObject> = new Collection();

	private _queueChatMessage(obj: QueuedMessageObject) {
		if (this.#_messageQueue.array().length == 0) return this._sendChatMessage(obj);
		else return this.#_messageQueue.set(obj.ref, obj);
	}

	private _sendChatMessage(obj: QueuedMessageObject) {
		Promise.resolve(obj.resolve).then(msg => {
			this._internalMsgEventHandler.emit(obj.ref, msg);
		}).catch(console.error);
	}

	private _startMessageQueueRoutine() {
		setInterval(() => {
			const topMessage = this.#_messageQueue.first();
			if (!topMessage) return;
			this._sendChatMessage(topMessage);
		}, this._messageTimeout);
	}

	constructor(room: RoomController, client: Client) {
		this.#_room = room;
		this.client = client;

		this._startMessageQueueRoutine;
	}

	/** @todo */
	onNewMessage() {}

	send(message: Array<Unitoken | MessageToken | string> | string, options?: SendChatMessageOptions): Promise<MessageController> {
		return new Promise((res, reject) => {
			const ref = this.client.randStr(64);
			const tokens: MessageToken[] = kefler.encode(message);

			
			this._queueChatMessage({
				ref,
				resolve: new Promise((resolve, reject) => {
					this._internalMsgEventHandler.once(ref, (msg) => {
						res(msg);
					});

					this.client.api.fetch(OpCode.CHAT.SEND_MSG, {tokens}, {expectResponseData: false})
					resolve();
				})
			})
		});
	}
}