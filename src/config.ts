import BaseConfig from 'doge-config';

class DogeLibConfig extends BaseConfig {
	constructor () {
		super('dogelib-global', {
			chat: {
				default_message_delay: 1050,
			},
		});
	}

	get config (): DogeLibConfig {
		return this;
	}

	get chat_default_message_delay (): number {
		return this.__forceField('chat').__forceNumber('default_message_delay');
	}

	set chat_default_message_delay (val: number) {
		this.__forceField('chat').__set('default_message_delay', val);
	}
}

export const config = new DogeLibConfig;

export default config;
module.exports = config;
