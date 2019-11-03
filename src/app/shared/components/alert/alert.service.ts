import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AlertType, Alert } from "./alert";
import { Router, NavigationStart } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AlertService 
{
    alertSubject: Subject<Alert> = new Subject<Alert>();
    keepIfRouteChange = false;

    constructor(private router: Router) {
        this.router.events.subscribe(event => {
            if(event instanceof(NavigationStart)) {
                if(this.keepIfRouteChange){
                    this.keepIfRouteChange = false;                    
                }
                else {
                    this.clear();
                }
            }
        })
    }

    success(message: string, keepIfRouteChange:boolean = true) {
        this.alert(AlertType.SUCCESS, message, keepIfRouteChange)
    }

    warning(message: string, keepIfRouteChange:boolean = true) {
        this.alert(AlertType.WARNING, message, keepIfRouteChange)
    }

    danger(message: string, keepIfRouteChange:boolean = true) {
        this.alert(AlertType.DANGER, message, keepIfRouteChange)
    }

    info(message: string, keepIfRouteChange:boolean = true) {
        this.alert(AlertType.INFO, message, keepIfRouteChange)
    }

    private alert(alertType: AlertType, message: string, keepIfRouteChange:boolean = true){
        this.keepIfRouteChange = keepIfRouteChange;
        this.alertSubject.next(new Alert(alertType, message))
    }

    getAlert() {
        return this.alertSubject.asObservable(); 
    }

    clear() {
        this.alertSubject.next(null)
    }
}