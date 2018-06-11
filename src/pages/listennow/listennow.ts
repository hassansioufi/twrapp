import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Events } from 'ionic-angular';

@Component({
  selector: 'page-listennow',
  templateUrl: 'listennow.html'
})
export class ListenNowPage {

  private volume=50;
  ls="http://viadj.viastreaming.net:7209/;stream/1";
  wp: any;

  constructor(public navCtrl: NavController,public events: Events) {
    
  }

  ionViewDidEnter () {
    document.getElementById("listen-now-text").innerHTML=document.getElementById("cc_stream_info_song").innerHTML;
    this.whoPlay();
  }
  
  volumeControl(v){
    this.events.publish('play:volume',(v.value/100));
  }

  livePlay(){
    if(this.wp==this.ls){
     this.events.publish('play:pause',"","");
    }else{
     this.events.publish('play:pause',"",this.ls);
    }
    this.whoPlay();
  }

  whoPlay(){
    this.wp = this.events.publish('who:play');
    if(this.wp==this.ls){
      document.getElementsByClassName("btn-play")[0].classList.add("btn-pause");
    }else{
      document.getElementsByClassName("btn-play")[0].classList.remove("btn-pause");
    }
  }

}
