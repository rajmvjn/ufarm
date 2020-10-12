import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";

/*
Wrapper for console logs
*/
@Injectable({
  providedIn: "root",
})
export class LoggerService {
  constructor() {}

  log(...args) {
    if (environment.logger.log) {
      console.log(...args);
    }
  }

  error(...args) {
    if (environment.logger.error) {
      console.error(...args);
    }
  }

  trace(...args) {
    if (environment.logger.trace) {
      console.trace(...args);
    }
  }

  warn(...args) {
    if (environment.logger.warn) {
      console.warn(...args);
    }
  }

  debug(...args) {
    if (environment.logger.debug) {
      console.debug(...args);
    }
  }
}
