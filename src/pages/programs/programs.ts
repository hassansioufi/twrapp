import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html'
})
export class ProgramsPage {
 
  @ViewChild(Slides) slides: Slides;
  posts: any;
  api="http://arabicprograms.org/api/programs.php";

  constructor(public http: Http,public navCtrl: NavController) {
    
    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
      },
      err => {
        /** Error or internet problem **/
      }
    );

  }

  goToPrev() {
    let currentIndex = this.slides.getActiveIndex();
    this.slides.slideTo(currentIndex-1, 500);
  }

  goToNext() {
    let currentIndex = this.slides.getActiveIndex();
    this.slides.slideTo(currentIndex+1, 500);
  }

}
