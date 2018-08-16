import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { ProgramPage } from '../program/program';
import { ProgramslistPage } from '../programslist/programslist';

import { Http} from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html'
})
export class ProgramsPage {
 
  @ViewChild(Slides) slides: Slides;
  posts: any;
  api="http://arabicprograms.org/api/programs.php";

  constructor(public http: Http,private storage: Storage,public navCtrl: NavController) {
    
    this.storage.get('programs').then((val) => {
      if (val){
        this.posts=val;
        this.f1();
      }
    });

    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        this.storage.set('programs', data);
        this.f1();

      },
      err => {
        /** Error or internet problem **/
      }
    );

  }

  f1(){
    //document.getElementById("b").style.display="block";
    //document.getElementById("b").classList.add("shw");
    document.getElementById("spinner").style.display="none";
    document.getElementById("data").classList.add("shw");
    document.getElementById("l").classList.add("shw");
    document.getElementById("r").classList.add("shw");
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

  goToProgram(i,t,im,ft,l){
    this.navCtrl.push(ProgramPage,{
      id: i,
      title: t,
      img: im,
      full_text: ft,
      link:l
    });
  }
  
  goToProgramsList(){
    this.navCtrl.push(ProgramslistPage);
  }

}
