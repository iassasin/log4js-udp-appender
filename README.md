# Log4JS - UDP appender

This is an optional appender for [log4js-node](https://log4js-node.github.io/log4js-node/).
```bash
npm install log4js-udp-appender
```

This appender like [logstashUDP](https://github.com/log4js-node/logstashUDP), but transfer raw data to UDP server. It uses the node.js core UDP support, and so requires no extra dependencies. Remember to call `log4js.shutdown` in your application if you want the UDP socket closed cleanly.

## Configuration

* `type` - `log4js-udp-appender`
* `host` - `string` - hostname (or IP-address) of the target server
* `port` - `integer` - port of the target server
* `layout` - (optional, defaults to `basic` with `\n` at end of message) - used for the whole message sent via UDP to server (see layouts)

## Example
### default config
```javascript
log4js.configure({
  appenders: {
    collector: {
      type: 'log4js-udp-appender',
      host: 'log.server',
      port: 12345
    }
  },
  categories: {
    default: { appenders: ['collector'], level: 'info' }
  }
});
const logger = log4js.getLogger();
logger.info("important log message", { cheese: 'gouda', biscuits: 'hobnob' });
```
This will result in a message being sent to log.server:12345 over UDP, with the following format:
```
[2020-05-05T18:48:44.461] [INFO] default - important log message { cheese: 'gouda', biscuits: 'hobnob' }
// <-- newline here
```