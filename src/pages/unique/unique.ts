import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-unique',
  templateUrl: 'unique.html',
})
export class UniquePage {

  posts: any;
  pagetitle="حلقات مميزة";
  api="http://arabicprograms.org/api/unique.php";
  wp: any;
  timer:any;
  storagename="unique";

  constructor(public alertCtrl: AlertController,public http: Http,public navCtrl: NavController,private storage: Storage, public navParams: NavParams,public events: Events) {

    this.timer=setInterval(() => { this.whoPlay(); }, 1000);
    
    if(this.navParams.get("type") && this.navParams.get("type")){
      this.api="http://arabicprograms.org/api/newest.php";
      this.pagetitle="حلقات جديدة";
      this.storagename="newest";
    }

    this.storage.get(this.storagename).then((val) => {
      if (val){
        this.posts=val;
        document.getElementById("unique-spinner").style.display="none";
      }
    });

    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        this.storage.set(this.storagename, data);
        document.getElementById("unique-spinner").style.display="none";
     
      },
      err => {
        /** Error or internet problem **/
      }
    );

  }

  playTrack(track: string,title: string,artist: string,art:string){
    if(track==this.wp){
      this.events.publish('play:pause',"","","","");
    }else{
      this.events.publish('play:pause',title,artist,art,track);
    }
    this.whoPlay();
  }

  whoPlay(){
    this.wp = this.events.publish('who:play');
  }

  ionViewDidEnter () {
    this.whoPlay();
  }

  addtoFavorite(id){
    this.storage.get('mf').then((val) => {
      
      if(val==null){
        val="[]";
        this.storage.set('mf', val);
      }
      
      let val_array= JSON.parse(val);

      if(!val_array.includes(id)){
        val_array.push(id);
        this.storage.set('mf', JSON.stringify(val_array));
        this.showAlert("لقد تم إضافة الحلقة إلى المفضلات");
       // alert(JSON.stringify(val_array));
      }else{
        const index = val_array.indexOf(id);
        val_array.splice(index, 1);
        this.storage.set('mf', JSON.stringify(val_array));
        this.showAlert("لقد تم حذف الحلقة من المفضلات");
        //alert(JSON.stringify(val_array));
      }

    });
  }

  showAlert(subtitle) {
    const alert = this.alertCtrl.create({
      title: "مفضلاتي",
      subTitle: subtitle,
      buttons: ['تم']
    });
    alert.present();
  }

  ionViewCanLeave() {
    clearTimeout(this.timer);
  }



}
