import { Component } from '@angular/core';
import { UserService } from 'src/user.service';
import { FormGroup,Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserService]
})
export class UserCreateComponent  {
  users: any ;
  userForm: FormGroup;
  constructor(private userService:UserService, private userFormB: FormBuilder ){
    this.userForm = this.userFormB.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  
  }
  
  

  createUser(): void {
    console.log('work')
   console.log(this.userForm.value)
   const data = {
    username: this.userForm.value.name,
    email: this.userForm.value.email
  };

  this.userService.createUser(data).subscribe((res) => {
    console.log(res);
  });

  alert('User created successfully!');
  this.userForm.reset();
}
}

