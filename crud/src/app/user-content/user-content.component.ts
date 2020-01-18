import {UserService } from './../user.service';
import { User } from './../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css'],
  providers: [UserService]
})
export class UserContentComponent implements OnInit {

  // users: any<User>;
  // users: Array<User>;
  // users: User;
  // users: Observable<IUsers[]>;
  users: User[];
  // users: Array<any>;


  selectedUser: User;
  private hidenewUser: boolean = true;

  constructor(private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUsers()
    //  .subscribe(resUserData => this.users = resUserData);
        .subscribe ((resUserData) => {
          console.log('resUserData: ', resUserData);
        });
      }
//open chrome
  onSelectUser(user:any){
    this.selectedUser = user;
    this.hidenewUser = true;
    console.log(this.selectedUser);
  }

  onSubmitAddUser(user: User)
  {
    this._userService.addUser(user)
     .subscribe(resNewUser => {
       this.users.push(resNewUser);
       this.hidenewUser = true;
       this.selectedUser = resNewUser;
      });
  }

  onUpdateUserEvent(user: any) {
    this._userService.updateUser(user)
      .subscribe(resUpdatedUser => user = resUpdatedUser);
    this.selectedUser = null;
  }

  onDeleteUserEvent(user: any) {
    let userArray = this.users;
    this._userService.deleteUser(user)
      .subscribe(resDeletedUser => {
        for (let i = 0; i < userArray.length; i++) {
          if (userArray[i]._id === user._id) {
            userArray.splice(i, 1);
          }
        }
      });
    this.selectedUser = null;
    }

  newUser() {
    this.hidenewUser = false;
  }

}
