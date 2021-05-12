import { Client } from "../Client";

export class MessageController {

	public client: Client;

	constructor(raw: any, client: Client) {
		this.client = client;
	}

}