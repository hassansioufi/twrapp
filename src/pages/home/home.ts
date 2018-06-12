import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MorePage } from '../more/more';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private  storage: Storage) {
    

    this.storage.get('mf').then((val) => {
       alert(val);
    })

  } 

}
