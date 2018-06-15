import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../search/search';

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
   }
}

}
