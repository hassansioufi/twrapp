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
    
    this.timer=setInterval(() => { this.syncDuration(); }, 1000);
    
  }
  
  syncDuration(){
    
    this.getDuration();

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
    if(!seconds)
     return "00:00";

    var date = new Date(1970,0,1);
    date.setSeconds(seconds);
    return date.toTimeString().replace(/.*(\d{2}:\d{2}).*/, "$1");
  }

  
  playPause(){
   let p=String(this.events.publish('player:playing'));
  
   if(p=="1"){
    this.events.publish('player:pause');
    document.getElementsByClassName("btn-play")[0].classList.remove("btn-pause");
   }
   if(p=="0"){
    this.events.publish('player:play');
    document.getElementsByClassName("btn-play")[0].classList.add("btn-pause");
   }
  }
  
  ionViewDidLoad(){
    this.getDuration();
    this.syncDuration();
    this.changebtn();
  }

  changebtn(){
    let p=String(this.events.publish('player:playing'));
    if(p=="1"){
      document.getElementsByClassName("btn-play")[0].classList.add("btn-pause");
    }
    if(p=="0"){
      document.getElementsByClassName("btn-play")[0].classList.remove("btn-pause");
    }
  }

  ionViewCanLeave() {
    clearTimeout(this.timer);
  }


}