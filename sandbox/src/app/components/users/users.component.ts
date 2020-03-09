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
  // currentClasses = {};
  // currentStyles = {};
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
          // image: 'http://lorempixel.com/600/600/people/3',
          isActive: true,
          // balance: 100,
          registered: new Date('08/11/2019 06:20:00'),
          hide: true
        },
        { firstName: 'Kevin',
          lastName: 'Doe',
          age: 30,
          address: {
            street: '50 main st',
            city: 'Boston',
            state: 'MA'
          },
          // image: 'http://lorempixel.com/600/600/people/2',
          isActive: false,
          // balance: 200,
          registered: new Date('08/11/2018 07:20:00'),
          hide: true
        },
        { firstName: 'Mark',
          lastName: 'Doe',
          age: 30,
          address: {
            street: '50 main st',
            city: 'Boston',
            state: 'MA'
          },
          // image: 'http://lorempixel.com/600/600/people/1',
          isActive: true,
          // balance: 100,
          registered: new Date('08/11/2017 05:20:00'),
          hide: true
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
      // this.setCurrentClasses();
      // this.setCurrentStyles();
  }

  addUser(user: User) {
    this.users.push(user);
  }

  
  // setCurrentClasses() {
  //   this.currentClasses = {
  //     'btn-success': this.enableAdd,
  //     'big-text': this.showExtended
  //   }
  // }

  // setCurrentStyles() {
  //   this.currentStyles = {
  //     'padding-top': this.showExtended ? '0' : '120px',
  //     'font-size': this.showExtended ? '' : '60px'
  //   }
  // }

}
