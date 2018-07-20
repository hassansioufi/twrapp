import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { MusicPage} from '../music/music'
import { ProgramslistPage } from '../programslist/programslist';
import { MyfavoritePage } from '../myfavorite/myfavorite';
import { SocialPage } from '../social/social';
import { UniquePage } from '../unique/unique';
import { MusicControls } from '@ionic-native/music-controls';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  

  constructor(public navCtrl: NavController,private musicControls: MusicControls) {
  
   

  }

  ionViewDidEnter () {
    this.p();
  }

  p(){
    alert('gg');
    this.musicControls.create({
      track       : 'Time is Running Out',        // optional, default : ''
      artist      : 'Muse',                       // optional, default : ''
      cover       : '',      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying   : true,                         // optional, default : true
      dismissable : true,                         // optional, default : false
    
      // hide previous/next/close buttons:
      hasPrev   : false,      // show previous button, optional, default: true
      hasNext   : false,      // show next button, optional, default: true
      hasClose  : true,       // show close button, optional, default: false
    
    // iOS only, optional
      album       : 'Absolution',     // optional, default: ''
      duration : 60, // optional, default: 0
      elapsed : 10, // optional, default: 0
      hasSkipForward : true,  // show skip forward button, optional, default: false
      hasSkipBackward : true, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
      hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional
    
      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated, optional
      ticker    : 'Now playing "Time is Running Out"',
      // All icons default to their built-in android equivalents
     // The supplied drawable name, e.g. 'media_play', is the name of a drawable found under android/res/drawable* folders
      playIcon: 'media_play',
      pauseIcon: 'media_pause',
      prevIcon: 'media_prev',
      nextIcon: 'media_next',
      closeIcon: 'media_close',
      notificationIcon: 'notification'
     });
  
  // Start listening for events
  // The plugin will run the events function each time an event is fired
  this.musicControls.listen();

  }


  events(action) {

    const message = JSON.parse(action).message;
    switch(message) {
      case 'music-controls-next':
        // Do something
        break;
      case 'music-controls-previous':
        // Do something
        break;
      case 'music-controls-pause':
        // Do something
        break;
      case 'music-controls-play':
        // Do something
        break;
      case 'music-controls-destroy':
        // Do something
        break;
  
      // External controls (iOS only)
        case 'music-controls-toggle-play-pause' :
        // Do something
        break;
        case 'music-controls-seek-to':
        const seekToInSeconds = JSON.parse(action).position;
        MusicControls.updateElapsed({
          elapsed: seekToInSeconds,
          isPlaying: true
        });
        // Do something
        break;
  
      // Headset events (Android only)
      // All media button events are listed below
      case 'music-controls-media-button' :
        // Do something
        break;
      case 'music-controls-headset-unplugged':
        // Do something
        break;
      case 'music-controls-headset-plugged':
        // Do something
        break;
      default:
        break;
    }
  }


   goTo(p: string){
    switch(p) { 
     case "1": { 
        this.navCtrl.push(SearchPage);
        break; 
     } 
     case "2": { 
       //this.navCtrl.push(AboutPage);
        break; 
     } 
     case "3": { 
      this.navCtrl.push(UniquePage,{
        type: "new"
      });
        break; 
     } 
     case "4": { 
        this.navCtrl.push(UniquePage);
        break; 
     } 
     case "5": { 
       this.navCtrl.push(MusicPage);
        break; 
     } 
     case "6": { 
      this.navCtrl.push(SocialPage);
       break; 
    } 
    case "7": { 
      this.navCtrl.push(ProgramslistPage);
       break; 
    } 
    case "8": { 
      this.navCtrl.push(MyfavoritePage);
       break; 
    } 
   } 


   
}

}


