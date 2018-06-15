import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-programdetails',
  templateUrl: 'programdetails.html',
})
export class ProgramdetailsPage {
 
  title=this.navParams.get("title");
  text=this.navParams.get("full_text");

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
