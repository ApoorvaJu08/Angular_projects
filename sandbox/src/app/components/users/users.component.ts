import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = true;
  currentClasses = {};
  constructor() { }

  ngOnInit() {
    // setTimeout(() => {
      this.users = [
        { firstName: 'John',
          lastName: 'Doe',
          age: 30,
          address: {
            street: '50 main st',
            city: 'Boston',
            state: 'MA'
          },
          image: 'http://lorempixel.com/600/600/people/3',
          isActive: true
        },
        { firstName: 'Kevin',
          lastName: 'Doe',
          age: 30,
          address: {
            street: '50 main st',
            city: 'Boston',
            state: 'MA'
          },
          image: 'http://lorempixel.com/600/600/people/2',
          isActive: false
        },
        { firstName: 'Mark',
          lastName: 'Doe',
          age: 30,
          address: {
            street: '50 main st',
            city: 'Boston',
            state: 'MA'
          },
          image: 'http://lorempixel.com/600/600/people/1',
          isActive: true
        },
      ];
      this.loaded = true;
    // }, 2000);

      // this.addUser({
      //   firstName: 'David',
      //   lastName: 'Doe'
      //   // age: 30,
      //   // address: {
      //   //   street: '50 main st',
      //   //   city: 'Boston',
      //   //   state: 'MA'
      //   // }
      // });
      this.setCurrentClasses();
  }

  addUser(user: User) {
    this.users.push(user);
  }

  setCurrentClasses() {
    this.currentClasses = {
      'btn-success': this.enableAdd,
      'big-text': this.showExtended
    }
  }

}
