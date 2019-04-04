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
    document.getElementsByClassName("btn1-play")[0].classList.remove("btn1-pause");
   }
   if(p=="0"){
    this.events.publish('player:play');
    document.getElementsByClassName("btn1-play")[0].classList.add("btn1-pause");
   }
  }
  
  ionViewWillEnter() {
    let p =document.getElementById('playing') as HTMLInputElement;
    if(p.value=="-1" || p.value=="2")
    this.navCtrl.remove(1);

    let art=document.getElementById("art-output") as HTMLImageElement;
    //alert(this.events.publish('player:art'));
    art.src=String(this.events.publish('player:art'));

    let artist=document.getElementById("artist-output") as HTMLElement;
    artist.innerHTML=String(this.events.publish('player:artist'));

    let title=document.getElementById("title-output") as HTMLElement;
    title.innerHTML=String(this.events.publish('player:title'));

  }
  ionViewDidLoad(){
    this.getDuration();
    this.syncDuration();
    this.changebtn();
  }

  changebtn(){
    let p=String(this.events.publish('player:playing'));
    if(p=="1"){
      document.getElementsByClassName("btn1-play")[0].classList.add("btn1-pause");
    }
    if(p=="0"){
      document.getElementsByClassName("btn1-play")[0].classList.remove("btn1-pause");
    }
  }

  ionViewCanLeave() {
    clearTimeout(this.timer);
  }


}
