import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/data';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-user-single-card',
  templateUrl: './user-single-card.component.html',
  styleUrls: ['./user-single-card.component.scss']
})
export class UserSingleCardComponent implements OnInit {
  userId!: string
  userObj!: IUser
  constructor(private _service: UserService,
    private _route: ActivatedRoute,
    private _matDailog:MatDialog,
    private _router:Router,
    private _snackBar:SnackBarService
  ) { }

  ngOnInit(): void {
    this.fethById()
  }

  fethById() {
    this.userId = this._route.snapshot.params['userId']
    if (this.userId) {
      this._service.fetchById(this.userId).subscribe({
        next: data => {
          this.userObj = data
        }
      })
    }
  }

  onRemove(){
    let Config=new MatDialogConfig()
    Config.data=`Are You Sure You Want To Delete ${this.userObj.userName}`
    Config.disableClose=true
    Config.width='400px'

    let Dailog=this._matDailog.open(ConfirmComponent,Config).afterClosed().subscribe((input:boolean)=>{
      if (input) {
        this._service.onRemove(this.userId).subscribe(res=>{
          this._router.navigate(['/'])
          this._snackBar.snackBar(`User Removed SuccessFully`)
        })
      }
    })
  }

}
