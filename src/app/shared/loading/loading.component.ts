import { Component } from "@angular/core";
import { LoadingService } from "./loading.service";
import { Observable } from "rxjs";
import { LoadingType } from "./loading-tupe";
import { map } from "rxjs/operators";

@Component({
	selector: 'ap-loading',
	templateUrl: './loading.component.html',
	styleUrls: ['loading.component.css']
})
export class LoadingComponent
{
	loading$: Observable<string>;
	constructor(private loadingService: LoadingService){

	}

	ngOnInit() {
		this.loading$ = this.loadingService.getLoading()
				.pipe(map(LoadingType => LoadingType.valueOf()))
	}
}