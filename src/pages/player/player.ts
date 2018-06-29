import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
  
  timer:any;
  private time=0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public events: Events) {
    
    this.timer=setInterval(() => { this.syncDuration() }, 1000);
    
  }
  
  syncDuration(){
    let sec = (document.getElementById('seconds') as HTMLInputElement);
    let x = Number(this.events.publish('play:time'));
    x=Math.floor(x);

    sec.innerHTML=String(this.formatSeconds(x));

    let y = Number(this.events.publish('track:duration'));
    y=Math.floor(y);
    this.time=(Math.floor((x*100)/y));
   
  }

  getDuration(){
    let d = (document.getElementById('duration') as HTMLInputElement);
    let x = Number(this.events.publish('track:duration'));
    x=Math.floor(x);
    d.innerHTML=String(this.formatSeconds(x));
  }

  setDuration(v){
    let x = Number(this.events.publish('track:duration'));
    x=Math.floor(x);
    this.events.publish('set:time',((v.value*x)/100));
  }

  
  formatSeconds(seconds)
  {
    var date = new Date(1970,0,1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
  }


  
  ionViewDidLoad(){
    this.getDuration();
    this.syncDuration();
  }

  ionViewCanLeave() {
    clearTimeout(this.timer);
  }


}
