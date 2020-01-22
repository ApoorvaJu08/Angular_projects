import { User } from './../user';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  @Input() user: any;
  @Output() private updateUserEvent = new EventEmitter();
  @Output() private deleteUserEvent = new EventEmitter();

  private editTitle: boolean = false;

  constructor() { }

  ngOnInit() {
    console.log('updateUserEvent: ', this.updateUserEvent);

  }

  ngOnChanges() {
    this.editTitle = false;
  }

  onTitleClick() {
    this.editTitle = true;
  }

  updateUser() {
    this.updateUserEvent.emit(this.user);
  }

  deleteUser() {
    this.deleteUserEvent.emit(this.user);
  }

}
