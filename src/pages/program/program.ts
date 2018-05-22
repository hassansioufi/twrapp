import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http} from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-program',
  templateUrl: 'program.html',
})
export class ProgramPage {
  pagetitle=this.navParams.get("title");
  posts: any;
  api="http://arabicprograms.org/api/program.php?id=" + this.navParams.get("id");

  constructor(public http: Http,public navCtrl: NavController, public navParams: NavParams) {
    
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


}
