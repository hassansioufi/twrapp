import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChaptersPage } from '../chapters/chapters';

@IonicPage()
@Component({
  selector: 'page-bible',
  templateUrl: 'bible.html',
})
export class BiblePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  

  goToChapter(i,t){

    this.navCtrl.push(ChaptersPage,{
      title: t,
      id: i,
    });
  }
 

}
