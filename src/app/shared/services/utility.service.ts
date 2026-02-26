import { Injectable } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  patchFormArr(dataArr: Array<any>, FormArr: FormArray) {
    FormArr.clear()
    dataArr.forEach(data => {
      let control = new FormControl(data, [Validators.required])
      FormArr.push(control)
    })
  }
}
