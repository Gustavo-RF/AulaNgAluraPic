import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Photo } from '../../photo/photo';
import { PhotoService } from '../../photo/photo.service';

@Component({
    selector: 'ap-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

    @Input() photos: Photo[] = [];
    rows: any[] = []

    constructor() { }

    ngOnInit() {
        this.rows = this.groupColumns(this.photos);
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.photos) this.rows = this.groupColumns(this.photos);
    }

    groupColumns(photos:Photo[]) {
        const newRow = [];

        for(let index = 0; index < photos.length; index += 3) {
            newRow.push(photos.slice(index, index + 3))
        }

        return newRow;
    }

}
