import {OnInit, Component} from "@angular/core";
import { IonicPage, NavController, NavParams,AlertController  } from 'ionic-angular';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {
  data:any = {};

  myForm: FormGroup;
  userInfo: {message: string, name: string, email: string, phone: string} = {message: '', name: '', email: '', phone: ''};


  constructor( private alertCtrl: AlertController,public http: Http,public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder) {
    
   
  
  }

  alertIt(t,s){
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: s,
      buttons: ['تابع']
    });
    alert.present();
  }

  ngOnInit(): any {
    this.myForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3)]],
      'phone': [''],
      'email': [''],
      'message': ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    
    if(this.userInfo.name.length<4 || this.userInfo.phone.length<3 || this.userInfo.email.length<4 || this.userInfo.message.length<4){
      this.alertIt('خطأ','الرجاء التأكد من صحة المعلومات');
      return false;
   }

   this.showLoader(1);
   var link = 'http://arabicprograms.org/api/contact.php';
   var myData = JSON.stringify({name: this.userInfo.name,email: this.userInfo.email,phone: this.userInfo.phone, message: this.userInfo.message});
   
   this.http.post(link, myData)
   .subscribe(data => {
      //alert (data["_body"]);
      this.showLoader(3);
      this.alertIt('','تم إرسال الرسالة بنجاح');
      this.myForm.reset();      
   }, error => {
    this.alertIt('خطأ','فشلت العملية ، يرجى المحاولة مرة أخرى في وقت لاحق');
    this.showLoader(0);
   });
  }

  isValid(field: string) {
    
    let formField = this.myForm.get(field);
    return formField.valid || formField.pristine;
  }
  
  showLoader(i){
    
    if(i==3){
      document.getElementById('spinner').style.display='none';
      return false;
    }

    if(i==1){
      document.getElementById('spinner').style.display='block';
      document.getElementById('btn').style.display='none';
    }
    
    if(i==0){
      document.getElementById('btn').style.display='inline-block';
      document.getElementById('spinner').style.display='none';
    }
  }


}
