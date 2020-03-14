import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  users: User[];
  constructor() {
    this.users = [
      { firstName: 'John',
        lastName: 'Doe',
        email: 'john@gmail.com',
        // age: 30,
        // address: {
        //   street: '50 main st',
        //   city: 'Boston',
        //   state: 'MA'
        // },
        // image: 'http://lorempixel.com/600/600/people/3',
        isActive: true,
        // balance: 100,
        registered: new Date('08/11/2019 06:20:00'),
        hide: true
      },
      { firstName: 'Kevin',
        lastName: 'Doe',
        email: 'kevin@gmail.com',
        // age: 30,
        // address: {
        //   street: '50 main st',
        //   city: 'Boston',
        //   state: 'MA'
        // },
        // image: 'http://lorempixel.com/600/600/people/2',
        isActive: false,
        // balance: 200,
        registered: new Date('08/11/2018 07:20:00'),
        hide: true
      },
      { firstName: 'Mark',
        lastName: 'Doe',
        email: 'mark@gmail.com',
        // age: 30,
        // address: {
        //   street: '50 main st',
        //   city: 'Boston',
        //   state: 'MA'
        // },
        // image: 'http://lorempixel.com/600/600/people/1',
        isActive: true,
        // balance: 100,
        registered: new Date('08/11/2017 05:20:00'),
        hide: true
      },
    ];
  }
  getUsers(): User[] {
    console.log('users from service');
    return this.users;
  }
  addUser(user: User) {
    this.users.unshift(user);
  }
}
