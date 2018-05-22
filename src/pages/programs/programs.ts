import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ProgramPage } from '../program/program';

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
        document.getElementById("spinner").style.display="none";
        document.getElementById("data").style.display="block";
        document.getElementById("l").style.display="block";
        document.getElementById("r").style.display="block";
      },
      err => {
        /** Error or internet problem **/
      }
    );

  }

  goToPrev() {
    if(!this.slides.isBeginning()){
      let currentIndex = this.slides.getActiveIndex();
      this.slides.slideTo(currentIndex-1, 500);
    }
  }

  goToNext() {
    if(!this.slides.isEnd()){
      let currentIndex = this.slides.getActiveIndex();
      this.slides.slideTo(currentIndex+1, 500);
    }
  }

  goToProgram(i,t){
    this.navCtrl.push(ProgramPage,{
      id: i,
      title: t
    });
  }

}
