import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  providers:[UserService]
})
export class UserEditComponent implements OnInit {
  user: any = {};
  userFormUpdate: FormGroup;
  userId: number;

  constructor(
    private userService: UserService,
    private userFormB: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { user: any },
    public dialogRef: MatDialogRef<UserEditComponent>
  ) {
    this.userFormUpdate = this.userFormB.group({
      name: [data.user.name, Validators.required],
      email: [data.user.email, Validators.required]
    });
    this.userId = data.user.id;
  }

  ngOnInit(): void {}

  updateUserInfo(): void {
    console.log('Updating user info', this.userFormUpdate.value);
   
    this.userService.updateUser(this.userId, this.userFormUpdate.value)
      .subscribe(
        (res) => {
          console.log('Data updated successfully', res);
          alert('Data Updates Successfully!');
          // Close the dialog and pass the updated user data back
          this.dialogRef.close({ updatedUser: this.userFormUpdate.value });
        },
        (error) => {
          console.log('error updating the data')
        })
       
  }
}
