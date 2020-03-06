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
          }
        },
        { firstName: 'Kevin',
          lastName: 'Doe',
          age: 30,
          address: {
            street: '50 main st',
            city: 'Boston',
            state: 'MA'
          }
        },
        { firstName: 'Mark',
          lastName: 'Doe',
          age: 30,
          address: {
            street: '50 main st',
            city: 'Boston',
            state: 'MA'
          }
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
