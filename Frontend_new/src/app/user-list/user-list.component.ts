import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res) => {
      console.log('Users data: ', res);
      this.users = res;
    });
  }

  getUsersById(userId: number) {
    this.userService.findById(userId).subscribe((res) => {
      console.log(res);
    });
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: '400px',
      data: { user },
      panelClass: 'my-custom-dialog', 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.updatedUser) {
        // Update the user list with the updated user
        const index = this.users.findIndex(u => u.id === result.updatedUser.id);
        if (index !== -1) {
          this.users[index] = result.updatedUser;
        }
      }
    });
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe(() => {
        // Remove the deleted user from the local array
        this.users = this.users.filter((user) => user.id !== userId);
      });
    }
  }
}
