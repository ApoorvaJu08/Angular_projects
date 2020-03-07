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
          image: 'http://lorempixel.com/600/600/people/3'
        },
        { firstName: 'Kevin',
          lastName: 'Doe',
          age: 30,
          address: {
            street: '50 main st',
            city: 'Boston',
            state: 'MA'
          },
          image: 'http://lorempixel.com/600/600/people/2'
        },
        { firstName: 'Mark',
          lastName: 'Doe',
          age: 30,
          address: {
            street: '50 main st',
            city: 'Boston',
            state: 'MA'
          },
          image: 'http://lorempixel.com/600/600/people/1'
        },
      ];
      this.loaded = true;
    // }, 2000);

      this.addUser({
      firstName: 'David',
        lastName: 'Doe'
        // age: 30,
        // address: {
        //   street: '50 main st',
        //   city: 'Boston',
        //   state: 'MA'
        // }
    });
  }

  addUser(user: User) {
    this.users.push(user);
  }

}
