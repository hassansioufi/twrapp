import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-chapters',
  templateUrl: 'chapters.html',
})
export class ChaptersPage {
  
  title=this.navParams.get("title");
  posts: any;
  api="http://arabicprograms.org/api/chapters.php?id=" + this.navParams.get("id");
  wp: any;

  constructor(public http: Http,public navCtrl: NavController, public navParams: NavParams,public events: Events) {
    
    this.whoPlay();

    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        document.getElementById("chapters-spinner").style.display="none";
      },
      err => {
        /** Error or internet problem **/
      }
    );

  }
  

  playTrack(track: string,title: string){
    if(track==this.wp){
      this.events.publish('play:pause',"","");
    }else{
      this.events.publish('play:pause',title,track);
    }
    this.whoPlay();
  }
  
  whoPlay(){
    this.wp = this.events.publish('who:play');
  }

  ionViewDidEnter () {
    this.whoPlay();
  }


}
