import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(private activatedRoute: ActivatedRoute,
				private titleService: Title,
				private router: Router) {

	}

	ngOnInit() {
		this.router.events
		.pipe(filter(event => event instanceof NavigationEnd))
		.pipe(map(() => this.activatedRoute))
		.pipe(map(route => {
			while(route.firstChild) route = route.firstChild;
			return route;
		}))
		.pipe(switchMap(route => route.data))
		.subscribe(event => {
			this.titleService.setTitle(event.title)
		})

	}
}
