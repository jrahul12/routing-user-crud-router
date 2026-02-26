import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor() { }
  snackBar(data: string) {
    Swal.fire({
      title: data,
      icon: "success",
      timer: 3000
    });
  }

  loader$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
}
