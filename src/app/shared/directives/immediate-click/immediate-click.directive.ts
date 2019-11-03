import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective
{
    constructor(private element: ElementRef<any>) {
    }
    
    ngOnInit() {
        this.element.nativeElement.click();
    }
}