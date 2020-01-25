import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './../../category.service';
import { Category } from '../category';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  category: Category = { id: null, catName: '', catDesc: '', catImgUrl: '', catContent: '', updated: null };
  isLoadingResults = true;
  // category: any;
  constructor(private route: ActivatedRoute, private api: CategoryService, private router: Router) { }

  ngOnInit() {
    this.getCategoryDetails(this.route.snapshot.params.id);
  }

  getCategoryDetails(id: any) {
    this.api.getCategory(id)
      .subscribe((data: any) => {
        this.category = data;
        this.category.id = data._id;
        // console.log('category: ', this.category);
        this.isLoadingResults = false;
      });
  }

  deleteCategory(id: any) {
    this.isLoadingResults = true;
    // console.log('id: ', id);
    this.api.deleteCategory(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/category']);
        }, (err) => {
          // console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
