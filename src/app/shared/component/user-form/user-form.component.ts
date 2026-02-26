import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../model/data';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';
import { SnackBarService } from '../../services/snack-bar.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm!: FormGroup;
  userId!: string;
  isInEditMode: boolean = false;

  constructor(
    private _service: UserService,
    private _router: Router,
    private _routes: ActivatedRoute,
    private _utilityService: UtilityService,
    private _snackBar: SnackBarService
  ) { }

  // ================= INIT =================
  ngOnInit(): void {
    this.createForm();
    this.patchValueSame();

    this.userId = this._routes.snapshot.params['userId'];

    if (this.userId) {
      this.patchValueInForm();   // EDIT MODE
    } else {
      this.AddSkills();          // ADD MODE → show one skill field
    }
  }

  // ================= CREATE FORM =================
  createForm() {
    this.userForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      userRole: new FormControl(null, Validators.required),
      profileDescription: new FormControl(null, Validators.required),
      profileImage: new FormControl(null, Validators.required),
      experienceYears: new FormControl(null, Validators.required),

      address: new FormGroup({
        current: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required),
        }),

        permanent: new FormGroup({
          country: new FormControl(null, Validators.required),
          state: new FormControl(null, Validators.required),
          city: new FormControl(null, Validators.required),
          zipcode: new FormControl(null, Validators.required),
        })
      }),

      skills: new FormArray([]),

      isAddSame: new FormControl(false)
    });
  }

  // ================= SAME ADDRESS LOGIC =================
  patchValueSame() {

    this.userForm.get('isAddSame')?.valueChanges.subscribe(res => {

      const current = this.userForm.get('address.current')?.value;
      const permanent = this.userForm.get('address.permanent');

      if (res) {
        permanent?.patchValue(current);
        permanent?.disable({ emitEvent: false });
      } else {
        permanent?.enable({ emitEvent: false });
        permanent?.reset();
      }
    });

    this.userForm.get('address.current')?.valueChanges.subscribe(val => {
      if (this.userForm.get('isAddSame')?.value) {
        this.userForm.get('address.permanent')?.patchValue(val);
      }
    });
  }

  // ================= GET FORM ARRAY =================
  get SkillsArr() {
    return this.userForm.get('skills') as FormArray;
  }

  // ================= ADD SKILL =================
  AddSkills() {
    const control = new FormControl(null, Validators.required);
    this.SkillsArr.push(control);
  }

  // ================= REMOVE SKILL =================
  onRemove(i: number) {
    this.SkillsArr.removeAt(i);
  }

  // ================= ADD USER =================
  onAdd() {
    if (this.userForm.valid) {

      const createObj: IUser = this.userForm.value;

      this._service.onAdd(createObj).subscribe({
        next: () => {
          this._router.navigate(['/user']);
          this._snackBar.snackBar(`User Added Successfully`);
        }
      });
    }
  }

  // ================= PATCH DATA IN EDIT MODE =================
  patchValueInForm() {

    this._service.fetchById(this.userId).subscribe({
      next: data => {

        this.isInEditMode = true;

        // Patch normal fields
        this.userForm.patchValue({
          ...data,
          skills: []
        });

        // Patch skills FormArray
        if (data.skills && data.skills.length) {
          this._utilityService.patchFormArr(data.skills, this.SkillsArr);
        } else {
          this.AddSkills();
        }
      }
    });
  }

  // ================= UPDATE USER =================
  onUpdate() {
    if (this.userForm.valid) {

      let updateObj: IUser = {
        ...this.userForm.value,
        userId: this.userId
      };

      this._service.onUpdate(updateObj).subscribe({
        next: () => {
          this._router.navigate(['/']);
          this._snackBar.snackBar(`User Updated Successfully`);
        }
      });
    }
  }

}