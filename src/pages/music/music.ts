import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-music',
  templateUrl: 'music.html',
})
export class MusicPage {
  
  posts: any;
  wp: any;
  api="http://arabicprograms.org/api/music.php";
  timer:any;

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

  constructor(public navCtrl: NavController,private storage: Storage, public navParams: NavParams, public http: Http,public events: Events ) {
    
    
    this.timer=setInterval(() => { this.whoPlay(); }, 1000);

    this.storage.get('music').then((val) => {
      if (val){
        this.posts=val;
        document.getElementById("music-spinner").style.display="none";
      }
    });

    this.whoPlay();

    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        this.storage.set('music', data);
        document.getElementById("music-spinner").style.display="none";
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

  ionViewCanLeave() {
    clearTimeout(this.timer);
  }

}
