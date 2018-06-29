import { Component  } from '@angular/core';
import { Platform,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { ListenNowPage } from '../pages/listennow/listennow';
import { NavController } from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {Nav} from 'ionic-angular';

import { NativeAudio } from '@ionic-native/native-audio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) navCtrl: Nav;

  constructor(private nativeAudio: NativeAudio,private app: App,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public events: Events) {

  

    events.subscribe('play:pause',(title,track) => {

      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.title=title;

      let source = (document.getElementById('audioSource') as HTMLInputElement);
      source.src = track;
      audio.load();
      audio.play();
      
      this.nativeAudio.preloadSimple('uniqueId1', track);
      this.nativeAudio.play('uniqueId1');

    });

    events.subscribe('who:play',() => {
      let source = (document.getElementById('audioSource') as HTMLInputElement);
      return source.src;
    });

    events.subscribe('play:volume',(v) => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.volume=v;
    });

    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var aud = document.getElementById("audio") as HTMLVideoElement ;
      aud.onended = function() {
         let source = (document.getElementById('audioSource') as HTMLInputElement);
         source.src = "";
      }; 

      statusBar.styleDefault();
      splashScreen.hide();

    });

    
  }


  goToTab2(){
    //this.app.getActiveNav().parent.select(1)

    let view = this.navCtrl.getActive();
    if ( view.instance instanceof ListenNowPage ){
      this.navCtrl.remove(1);
    }else{
      this.navCtrl.push (ListenNowPage);
    }

  }
  
}
