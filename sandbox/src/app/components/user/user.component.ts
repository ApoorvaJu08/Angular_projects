import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;
  constructor() {
   }

  ngOnInit() {
    this.user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com'
      // age: 30,
      // address: {
      //   street: '50 main st',
      //   city: 'Boston',
      //   state: 'MA'
      // }
    };
  }

}
