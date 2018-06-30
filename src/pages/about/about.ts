import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

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
        this.storage.set('about', data);
        refresher.complete();
      },
      err => {
      }
    );
  }
  
  constructor(public navCtrl: NavController,private storage: Storage, public navParams: NavParams, public http: Http ) {
    
    this.storage.get('about').then((val) => {
      if (val){
        this.posts=val;
        document.getElementById("about-spinner").style.display="none";
      }
    });

    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        this.storage.set('about', data);
        document.getElementById("about-spinner").style.display="none";
      },
      err => {
      }
    );

  }

}
