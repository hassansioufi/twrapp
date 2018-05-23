import { Component } from '@angular/core';
import { NavController,Tabs } from 'ionic-angular';
import { SocialPage } from '../social/social';
import { AboutPage } from '../about/about';
import { MusicPage } from '../music/music';
import { ContactPage } from '../contact/contact';
import { ProgramsPage } from '../programs/programs';


@Component({
  selector: 'page-more',
  templateUrl: 'more.html'
})
export class MorePage {
  
  tab:Tabs;

  constructor(public navCtrl: NavController) {
    this.tab = this.navCtrl.parent;
  }

  goTo(p: string){
       switch(p) { 
        case "1": { 
           this.navCtrl.push(SocialPage);
           break; 
        } 
        case "2": { 
          this.navCtrl.push(AboutPage);
           break; 
        } 
        case "3": { 
          this.navCtrl.push(MusicPage);
           break; 
        } 
        case "4": { 
          this.navCtrl.push(ContactPage);
           break; 
        } 
      } 
  }
  
  goToP(){
    this.tab.select(2);
  }

  ionViewDidEnter () {
alert('h');
  }

  ionViewWillLeave(){
    alert('g');
  }


}
