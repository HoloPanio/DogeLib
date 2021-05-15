import { Client } from "../../Client";
import { Event } from "../../util/types/events";
import { OpCode } from "../../util/types/opCodes";

export default (client: Client) => {
	client.api.on(OpCode.CHAT.NEW_CHAT_MESSAGE, (msg) => {
			//console.log(msg.d);
	});
}