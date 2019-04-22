import { HttpErrorResponse } from "@angular/common/http";
import { Injectable, ErrorHandler, Injector } from "@angular/core";
//import { map, tap, catchError } from "rxjs";
import { LogService } from "src/app/core/services/log.service";

@Injectable()
export class ErrorService implements ErrorHandler {
  loggerService: LogService;

  constructor(private injector: Injector) {
    this.loggerService = this.injector.get(LogService);
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      this.loggerService.logMsg(`${error.status} - ${error.message}`);
    } else {
      this.loggerService.logMsg(`${error.message}`);
    }
  }
}
