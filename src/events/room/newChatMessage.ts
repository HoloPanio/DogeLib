import { Client } from "../../Client";
import { Event } from "../../util/types/events";
import { OpCode } from "../../util/types/opCodes";

export default (client: Client) => {
	client.api.on(OpCode.CHAT.NEW_CHAT_MESSAGE, (sock_obj) => {
		const msg = sock_obj.d?.msg;
		if (typeof msg === 'object') {
			for (const [ roomId, room ] of
				client.rooms.current.filter(room => {
					/**
					 * Here, we need to check the room ID
					 * against the message object.
					 * 
					 * This is yet to be implemented into DogeHouse.
					 */
					return true;
				}).entries()
			) {
				room.chat.emit('new_message_raw', msg);
			}
		}
	});
}