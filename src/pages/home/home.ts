import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';
import { MusicPage} from '../music/music'
import { ProgramslistPage } from '../programslist/programslist';
import { MyfavoritePage } from '../myfavorite/myfavorite';
import { SocialPage } from '../social/social';
import { UniquePage } from '../unique/unique';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  

  constructor(public navCtrl: NavController) {
  

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


