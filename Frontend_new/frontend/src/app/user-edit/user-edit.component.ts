import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';
import { FormGroup,FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: any = {};
  userFormUpdate:FormGroup;
  constructor(private route: ActivatedRoute, private userService: UserService ,private userFormB: FormBuilder) {
    this.userFormUpdate=this.userFormB.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  

  userId = Number(this.route.snapshot.paramMap.get('id'))

  ngOnInit(): void {
    console.log(this.userId, "clicked");
  }

  updateUserInfo(): void {
    console.log(this.userFormUpdate.value);

    this.userService.updateUser(this.userId, this. userFormUpdate.value).subscribe((res)=> {
      console.log('Data updated successfully', res)
    })

    alert('Data updated successfully!');
    this.userFormUpdate.reset();
}
}
