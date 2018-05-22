import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  posts: any;
  refresher: any;
  api="http://arabicprograms.org/api/about.php";
  
  doRefresh(refresher) {
    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        refresher.complete();
      },
      err => {
      }
    );
  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http ) {

    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        document.getElementById("about-spinner").style.display="none";
        this.posts = data;
      },
      err => {
      }
    );

  }

}
