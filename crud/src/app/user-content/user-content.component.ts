import { User } from './../user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css']
})
export class UserContentComponent implements OnInit {

  users: User[] = [
    { _id: '1', name: 'Shubham', title: 'Lawyer'},
    { _id: '2', name: 'Udit', title: 'Designer'},
    { _id: '3', name: 'Girish', title: 'android'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
