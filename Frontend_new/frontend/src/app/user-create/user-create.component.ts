import { Component } from '@angular/core';
import { UserService } from 'src/user.service';
// import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule,FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  // standalone: true,
  templateUrl: './user-create.component.html',
  // imports: [FormsModule,ReactiveFormsModule],
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
   const data = (this.userForm.value)
   this.userService.createUser(data).subscribe((res) => {
    console.log(res)
   })
   alert('User created successfully!')

   this.userForm.reset();
  } 
}

