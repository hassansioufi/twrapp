import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  
  posts: any;
  api="http://arabicprograms.org/api/search.php?s=";
  wp: any;

  constructor(public alertCtrl: AlertController,public events: Events,public http: Http,public navCtrl: NavController, public navParams: NavParams) {
  
   
  }

  myFunction(){


  }

  playTrack(track: string,title: string){
    if(track==this.wp){
      this.events.publish('play:pause',"","");
    }else{
      this.events.publish('play:pause',title,track);
    }
    this.whoPlay();
  }

  whoPlay(){
    this.wp = this.events.publish('who:play');
  }

  ionViewDidEnter () {
    this.whoPlay();
  }


  searchByKeyword(e){
    this.searchNow(e.target.value)
  }

  searchNow(s){

    if(s.length<3)
     {this.showAlert();return false}

    document.getElementById("spinner3").style.display="inline-block";
    this.http.get(this.api + s).map(res => res.json()).subscribe(
      data => {
        this.posts = data; 
        document.getElementById("spinner3").style.display="none";    
      },
      err => {
        /** Error or internet problem **/
        document.getElementById("spinner3").style.display="none";  
      }
    );
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: "خطأ",
      subTitle: "الحد الأدنى للبحث هو 3 أحرف",
      buttons: ['تم']
    });
    alert.present();
  }
  

}
