import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-listennow',
  templateUrl: 'listennow.html'
})
export class ListenNowPage {

  constructor(public navCtrl: NavController) {
    alert(document.getElementById("cc_stream_info_song").innerHTML);
  }

}
