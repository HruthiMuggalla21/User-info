import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
    };

  getUsers(){
    this.userService.getUsers().subscribe((res)=> {
      console.log("Users data: ", res);
      this.users = res;
    })
  }

  getUsersById(userId: number){
    this.userService.findById(userId).subscribe((res)=>{
      console.log(res);
    })
  }

  deleteUser(userId: number): void {
      if (confirm('Are you sure you want to delete this user?')) {
        this.userService.deleteUser(userId).subscribe(() => {
          // Remove the deleted user from the local array
          this.users = this.users.filter(user => user.id !== userId);
        });
      }
  }
}
