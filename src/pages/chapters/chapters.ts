import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

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
  timer:any;

  constructor(public http: Http,private storage: Storage,public navCtrl: NavController, public navParams: NavParams,public events: Events) {
    
    this.timer=setInterval(() => { this.whoPlay(); }, 1000);
    
    this.storage.get('chapters'+this.navParams.get("id")).then((val) => {
      if (val){
        this.posts=val;
        document.getElementById("chapters-spinner").style.display="none";
      }
    });

    this.whoPlay();

    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        this.storage.set('chapters'+this.navParams.get("id"), data);
        document.getElementById("chapters-spinner").style.display="none";
      },
      err => {
        /** Error or internet problem **/
      }
    );

  }
  

  playTrack(track: string,title: string){
    if(track==this.wp){
      this.events.publish('play:pause',"","","","");
    }else{
      this.events.publish('play:pause',title,this.title,"../../assets/imgs/bible-audio.jpg",track);
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
