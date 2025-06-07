import winston from "winston";
import type { Logger } from "../domain/Logger";

export class WinstonLogger implements Logger {
	logger: winston.Logger;

	constructor() {
		this.logger = winston.createLogger({
			level: "info",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
			transports: [
				new winston.transports.Console({ level: "info" }),
				new winston.transports.File({
					filename: "error.log",
					level: process.env.ENV === "prod" ? "error" : "info",
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.json(),
					),
				}),
			],
		});
	}

	log(message: string): void {
		this.logger.info(message);
	}

	error(message: string): void {
		this.logger.error(message);
	}
}
