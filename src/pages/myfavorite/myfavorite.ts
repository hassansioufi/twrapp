import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-myfavorite',
  templateUrl: 'myfavorite.html',
})
export class MyfavoritePage {
  

  posts: any;
  api: any;
  wp: any;
  timer:any;
  

  constructor(public alertCtrl: AlertController,private storage: Storage,public http: Http,public navCtrl: NavController, public navParams: NavParams,public events: Events) {
    
    this.timer=setInterval(() => { this.whoPlay(); }, 1000);

  }


  playTrack(track: string,title: string,img: string,program_title: string){
    if(track==this.wp){
      this.events.publish('play:pause',"","");
    }else{
      this.events.publish('play:pause',title,program_title,img,track);
    }
    this.whoPlay();
  }

  whoPlay(){
    this.wp = this.events.publish('who:play');
  }

  ionViewDidEnter () {

    this.storage.get('mf').then((val) => {

      this.api ="http://arabicprograms.org/api/myfavorite.php?ids=" + val;

      this.http.get(this.api).map(res => res.json()).subscribe(
       data => {
         this.posts = data;
         document.getElementById("myfavorite-spinner").style.display="none";
      
       },
       err => {
         /** Error or internet problem **/
       }
     );

   })


    this.whoPlay();
  }

  removeFavorite(id){
    this.storage.get('mf').then((val) => {

      let val_array= JSON.parse(val);
      
      const index = val_array.indexOf(id);
      val_array.splice(index, 1);
      this.storage.set('mf', JSON.stringify(val_array));
      this.showAlert("لقد تم حذف الحلقة من المفضلات");
      //this.events.publish('play:pause',"","");
      this.removeElement(id);   

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

  removeElement(id) {
    var elem = document.getElementById("fav"+id);
    return elem.parentNode.removeChild(elem);
  }
  
  ionViewCanLeave() {
    clearTimeout(this.timer);
  }

}
