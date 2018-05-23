import { Component  } from '@angular/core';
import { Platform,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { ListenNowPage } from '../pages/listennow/listennow';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(private app: App,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public events: Events) {

    
    events.subscribe('play:pause',(title,track) => {

      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.title=title;

      let source = (document.getElementById('audioSource') as HTMLInputElement);
      source.src = track;
      audio.load();
      audio.play();
    });

    events.subscribe('who:play',() => {
      let source = (document.getElementById('audioSource') as HTMLInputElement);
      return source.src;
    });
    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    
  }

  goToTab2(){
    this.app.getActiveNav().parent.select(1)
  }
  
}
