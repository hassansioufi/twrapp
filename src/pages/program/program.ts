import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProgramdetailsPage } from '../programdetails/programdetails';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-program',
  templateUrl: 'program.html',
})
export class ProgramPage {

  pagetitle=this.navParams.get("title");
  programlink=this.navParams.get("link");
  programid=this.navParams.get("id");
  programimg=this.navParams.get("img");
  programfulltext=this.navParams.get("full_text");
  posts: any;
  api="http://arabicprograms.org/api/program.php?id=" + this.navParams.get("id");
  wp: any;
  timer:any;

  constructor(public alertCtrl: AlertController,private storage: Storage,public http: Http,public navCtrl: NavController, public navParams: NavParams,public events: Events) {


    this.timer=setInterval(() => { this.whoPlay(); }, 1000);

    this.storage.get('program'+this.programid).then((val) => {
      if (val){
        this.posts=val;
        document.getElementById("program-spinner").style.display="none";
      }
    });

    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        this.storage.set('program'+this.programid, data);
        document.getElementById("program-spinner").style.display="none";
     
      },
      err => {
        /** Error or internet problem **/
      }
    );
    
  }


  playTrack(track: string,title: string){
    if(track==this.wp){
      this.events.publish('play:pause',"","","","");
    }else{
      this.events.publish('play:pause',title,this.pagetitle,this.programimg,track);
    }
    this.whoPlay();
  }

  whoPlay(){
    this.wp = this.events.publish('who:play');
  }

  ionViewDidEnter () {
    this.whoPlay();
  }
  
  goToProgramDetails(){
    this.navCtrl.push(ProgramdetailsPage,{
      id: this.programid,
      title: this.pagetitle,
      full_text: this.programfulltext,
      link:this.programlink
    });
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
