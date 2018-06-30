import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProgramPage } from '../program/program';

import { Storage } from '@ionic/storage';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-programslist',
  templateUrl: 'programslist.html',
})
export class ProgramslistPage {

  posts: any;
  api="http://arabicprograms.org/api/programs.php";

  constructor(public http: Http,public navCtrl: NavController,private storage: Storage, public navParams: NavParams) {
    
    this.storage.get('programs').then((val) => {
      if (val){
        this.posts=val;
        document.getElementById("spinner1").style.display="none";
      }
    });

    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        this.storage.set('programs', data);
        document.getElementById("spinner1").style.display="none";
       
      },
      err => {
        /** Error or internet problem **/
      }
    );

  }

  goToProgram(i,t,im,ft){
    this.navCtrl.push(ProgramPage,{
      id: i,
      title: t,
      img: im,
      full_text: ft
    });
  }

}
