import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser,InAppBrowserOptions  } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-programdetails',
  templateUrl: 'programdetails.html',
})
export class ProgramdetailsPage {
 
  title=this.navParams.get("title");
  text=this.navParams.get("full_text");
  link=this.navParams.get("link");

  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
  }; 

  constructor(public navCtrl: NavController, public navParams: NavParams,private theInAppBrowser: InAppBrowser) {

 

  }

  public openWithInAppBrowser(url: string){
    this.theInAppBrowser.create(url,"_blank",this.options);
    return false;
  }

}
