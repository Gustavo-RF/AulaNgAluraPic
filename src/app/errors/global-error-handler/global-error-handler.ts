import { ErrorHandler, Injector } from "@angular/core";
import * as StackTrace from 'stacktrace-js'
import { LocationStrategy } from "@angular/common";

export class GlobalErrorHandler implements ErrorHandler
{

	handleError(error: any) {
		console.log('handler')
		const message = error.message ? error.message : error.toString();
		StackTrace.fromError(error).then(stackFrames => {
			console.log(stackFrames)
			const stackAsString = stackFrames.map(sf => {
				sf.toString();
			}).join('\n');
		})
	}
}