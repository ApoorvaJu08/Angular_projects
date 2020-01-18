import { User } from './../user';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() users: any;
  @Output() SelectUser = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onSelect(us: User) {
    this.SelectUser.emit(us);
  }

}
