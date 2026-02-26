import { Component, OnInit } from '@angular/core';
import { SnackBarService } from './shared/services/snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoad: boolean = false
  title = 'routing-crud-navigate';

  constructor(private _loader: SnackBarService) { }

  ngOnInit(): void {
    this._loader.loader$.subscribe(res => {
      this.isLoad = res
    })
  }
}
