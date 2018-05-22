import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({
  selector: 'page-programs',
  templateUrl: 'programs.html'
})
export class ProgramsPage {
 
  @ViewChild(Slides) slides: Slides;
  
  
  
  constructor(public navCtrl: NavController) {
    
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
