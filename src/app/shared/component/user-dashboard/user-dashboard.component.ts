import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/data';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userArr: IUser[] = []
  constructor(private _service: UserService) { }

  ngOnInit(): void {
    this._service.fetchAllData().subscribe(res => {
      this.userArr = res
    })
  }

}
