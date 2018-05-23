import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProgramdetailsPage } from '../programdetails/programdetails';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

import { Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-program',
  templateUrl: 'program.html',
})
export class ProgramPage {

  pagetitle=this.navParams.get("title");
  programid=this.navParams.get("id");
  programimg=this.navParams.get("img");
  posts: any;
  api="http://arabicprograms.org/api/program.php?id=" + this.navParams.get("id");
  wp: any;

  constructor(public http: Http,public navCtrl: NavController, public navParams: NavParams,public events: Events) {


    this.http.get(this.api).map(res => res.json()).subscribe(
      data => {
        this.posts = data;
        document.getElementById("program-spinner").style.display="none";
     
      },
      err => {
        /** Error or internet problem **/
      }
    );
    
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
  
  goToProgramDetails(){
    this.navCtrl.push(ProgramdetailsPage,{
      id: this.programid,
      title: this.pagetitle
    });
  }
  

}
