import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/user';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: ''
    // age: null,
    // address: {
    //   street: '',
    //   city: '',
    //   state: ''
    // }
  }
  users: User[];
  showExtended: boolean = true;
  loaded: boolean = false;
  enableAdd: boolean = false;
  showUserForm: boolean = false;
  @ViewChild('userForm') form: any;
  data: any;
  // currentClasses = {};
  // currentStyles = {};
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      console.log(data);
    });
    this.dataService.getUsers().subscribe(users => {
      this.users = users;
      this.loaded = true;
    });
    // setTimeout(() => {
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

  // addUser() {
  //   this.user.isActive = true;
  //   this.user.registered = new Date();
  //   this.users.unshift(this.user);
  //   this.user = {
  //     firstName: '',
  //     lastName: '',
  //     email: ''
  //     // age: null,
  //     // address: {
  //     //   street: '',
  //     //   city: '',
  //     //   state: ''
  //     // }
  //   }
  // }

  onSubmit({value, valid}: {value: User, valid: boolean}) {
    if(!valid) {
      console.log('Form is not valid');
    } else {
      value.isActive = true;
      value.registered = new Date();
      value.hide = true;
      this.dataService.addUser(value);
      this.form.reset();
    }
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
