const dgram = require('dgram');
const util = require('util');

function udpAppender(config, layout, logError) {
	const udp = dgram.createSocket('udp4');

	function log(loggingEvent) {
		let buffer = Buffer.from(layout(loggingEvent));

		udp.send(buffer, 0, buffer.length, config.port, config.host, err => {
			if (err) {
				logError(`log4js.udp - ${config.host}:${config.port} Error: ${util.inspect(err)}.`);
			}
		});
	}

	log.shutdown = cb => udp.close(cb);

	return log;
}

function configure(config, layouts, logError = console.error) {
	let layout;
	if (config.layout) {
		layout = layouts.layout(config.layout.type, config.layout);
	} else {
		layout = layouts.layout('pattern', {
			pattern: '[%d] [%p] %c - %m%n',
		});
	}
	return udpAppender(config, layout, logError);
}

module.exports.configure = configure;
