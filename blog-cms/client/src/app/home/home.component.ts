import { Component, OnInit } from '@angular/core';
import { Post } from '../post/post';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  isLoadingResults = true;

  constructor(private api: HomeService) { }

  ngOnInit() {
    // sika mtbl hai ki jb page load hoga to yeh api hit hogi, aur data aayega
    // hm ngOnInit pr api tb hit krate hai, jaise hi hme page load hone pr koi data show krana hota hai
    // jaishe ki user- profile, jaha pr page opn hoti hi user ki details show krani hoti haiha.
    this.api.getPosts()
      .subscribe((res: any) => {
        this.posts = res;
        console.log(this.posts);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
