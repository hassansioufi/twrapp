import { Component  } from '@angular/core';
import { Platform,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { ListenNowPage } from '../pages/listennow/listennow';
import { PlayerPage } from '../pages/player/player';
import { NavController } from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {Nav} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) navCtrl: Nav;

  constructor(private alertCtrl: AlertController,private app: App,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public events: Events) {

  

    events.subscribe('play:pause',(title,artist,art,track) => {

      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.title=title;
      
      let a = (document.getElementById('artist') as HTMLInputElement);
      a.value=artist;

      let ar = (document.getElementById('art') as HTMLInputElement);
      ar.value=art;


      let source = (document.getElementById('audioSource') as HTMLInputElement);
      source.src = track;
      audio.load();
      audio.play();
      

      if(track=="" || !(track)){
        let p =document.getElementById('playing') as HTMLInputElement;
        p.value="-1";
        a.value="";
        ar.value="";
      }else
        if(track=="http://viadj.viastreaming.net:7209/;stream/1"){
          let p =document.getElementById('playing') as HTMLInputElement;
          p.value="2";
          a.value="";
          ar.value="";
        }else{
          let p =document.getElementById('playing') as HTMLInputElement;
          p.value="1"
        }
    });
    
    events.subscribe('player:playing',() => {
      let p = (document.getElementById('playing') as HTMLInputElement);
      return p.value;
    });

    events.subscribe('player:title',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      return audio.title;
    });

    events.subscribe('player:artist',() => {
      let p = (document.getElementById('artist') as HTMLInputElement);
      return p.value;
    });

    events.subscribe('player:art',() => {
      let p = (document.getElementById('art') as HTMLInputElement);
      return p.value;
    });


    events.subscribe('player:play',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.play();
      let p =document.getElementById('playing') as HTMLInputElement;
      p.value="1"
    });

    events.subscribe('player:pause',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.pause();
      let p =document.getElementById('playing') as HTMLInputElement;
        p.value="0"
    });

    events.subscribe('who:play',() => {
      let source = (document.getElementById('audioSource') as HTMLInputElement);
      return source.src;
    });

    events.subscribe('play:time',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement);
      return audio.currentTime;
    });

    events.subscribe('track:duration',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement);
      return audio.duration;
    });

    events.subscribe('play:volume',(v) => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.volume=v;
    });

    events.subscribe('set:time',(t) => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.currentTime=t;
    });

    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    
      statusBar.styleDefault();
      splashScreen.hide();

      });
 }  


    handleEnd(){
      let view = this.navCtrl.getActive();
      if ( view.instance instanceof PlayerPage ){
        this.navCtrl.remove(1);
      }
      this.events.publish('play:pause',"","");
      this.presentPrompt();
    }


    presentPrompt() {
      let alert = this.alertCtrl.create({
        title: 'ما هو رأيك في هذا البرنامج!',
        inputs: [
          {
            name: 'name',
            placeholder: 'الاسم'
          },
          {
            name: 'email',
            placeholder: 'البريد الإلكتروني'
          },
          {
            name: 'comments',
            placeholder: 'تعليقات'
          }
        ],
        buttons: [
          {
            text: 'إلغاء',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'أرسل',
            handler: data => {
              
            }
          }
        ]
      });
      alert.present();
    }


  goToLiveStream(){
    //this.app.getActiveNav().parent.select(1)
   
    let view = this.navCtrl.getActive();
    if ( view.instance instanceof ListenNowPage ){
      this.navCtrl.remove(1);
    }else{
      this.navCtrl.push (ListenNowPage);
    }

  }




  goToPlayer(){
    
    let p =document.getElementById('playing') as HTMLInputElement;
    if(p.value=="-1" || p.value=="2")
     return false;
    
     let view = this.navCtrl.getActive();
    if ( view.instance instanceof PlayerPage ){
      this.navCtrl.remove(1);
    }else{
      this.navCtrl.push (PlayerPage);
    }

  }

  
}
