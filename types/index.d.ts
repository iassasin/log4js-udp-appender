export interface Log4jsUDPAppender {
	type: string;
	// hostname (or IP-address) of the target server
	host: string;
	// port of the target server
	port: number;
	// used for the whole data transferred to target
	// the layout should be the `Layout` type in log4js
	layout?: object;
}