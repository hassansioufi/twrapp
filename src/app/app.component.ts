import { Component  } from '@angular/core';
import { Platform,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Events } from 'ionic-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { ListenNowPage } from '../pages/listennow/listennow';
import { PlayerPage } from '../pages/player/player';
import {ViewChild} from '@angular/core';
import {Nav} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Http} from '@angular/http';
import { Network } from '@ionic-native/network';
import {FormControl} from '@angular/forms';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  @ViewChild(Nav) navCtrl: Nav;

  constructor(private network: Network,public http: Http,private backgroundMode: BackgroundMode,private alertCtrl: AlertController,private app: App,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public events: Events) {

  
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.alertIt('خطأ','لا يوجد إتصال بالانترنت');
    });



    events.subscribe('play:pause',(title,artist,art,track) => {
      /* for sending opinion */
      let artst = (document.getElementById('artist') as HTMLInputElement);
      let aud = (document.getElementById('audio') as HTMLVideoElement );
      let t=artst.value + "/" + aud.title;
      
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.title=title;
      
      let a = (document.getElementById('artist') as HTMLInputElement);
      a.value=artist;

      let ar = (document.getElementById('art') as HTMLInputElement);
      ar.value=art;


      let source = (document.getElementById('audioSource') as HTMLInputElement);
      source.src = track;
      audio.load();
      audio.play();
      

      if(track=="" || !(track)){
        

        let p =document.getElementById('playing') as HTMLInputElement;
        p.value="-1";
        a.value="";
        ar.value="";
        this.removePlayLogo();
        this.backgroundMode.disable();

        this.presentPrompt(t);
      }else
        if(track=="https://streamer.radio.co/sb1e7301c2/listen"){
          let p =document.getElementById('playing') as HTMLInputElement;
          p.value="2";
          a.value="";
          ar.value="";
          this.removePlayLogo();
          this.backgroundMode.enable();
        }else{
          let p =document.getElementById('playing') as HTMLInputElement;
          p.value="1"
          this.setPlayLogo();
          this.backgroundMode.enable();
        }
    });
    
    events.subscribe('player:playing',() => {
      let p = (document.getElementById('playing') as HTMLInputElement);
      return p.value;
    });

    events.subscribe('player:title',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      return audio.title;
    });

    events.subscribe('player:artist',() => {
      let p = (document.getElementById('artist') as HTMLInputElement);
      return p.value;
    });

    events.subscribe('player:art',() => {
      let p = (document.getElementById('art') as HTMLInputElement);
      return p.value;
    });


    events.subscribe('player:play',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.play();
      this.backgroundMode.enable();
      let p =document.getElementById('playing') as HTMLInputElement;
      p.value="1"
    });

    events.subscribe('player:pause',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.pause();

      let a = (document.getElementById('artist') as HTMLInputElement);
      let t=a.value + "/" + audio.title;
      this.presentPrompt(t);
      
      this.backgroundMode.disable();
      let p =document.getElementById('playing') as HTMLInputElement;
        p.value="0"
    });

    events.subscribe('who:play',() => {
      let source = (document.getElementById('audioSource') as HTMLInputElement);
      return source.src;
    });

    events.subscribe('play:time',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement);
      return audio.currentTime;
    });

    events.subscribe('track:duration',() => {
      let audio = (document.getElementById('audio') as HTMLVideoElement);
      return audio.duration;
    });

    events.subscribe('play:volume',(v) => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.volume=v;
    });

    events.subscribe('set:time',(t) => {
      let audio = (document.getElementById('audio') as HTMLVideoElement );
      audio.currentTime=t;
    });

    
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    
      statusBar.styleDefault();
      splashScreen.hide();

      });
 }  


    handleEnd(){
      let view = this.navCtrl.getActive();
      if ( view.instance instanceof PlayerPage ){
        this.navCtrl.remove(1);
      }

      this.events.publish('play:pause',"","");         
     
    }


    presentPrompt(t) {
      console.log(t);
      let alert = this.alertCtrl.create({
        title: 'اسمح لنا أن نعرف ما هو رأيك !',
        inputs: [
          {
            name: 'name',
            placeholder: 'الاسم'
          },
          {
            name: 'email',
            placeholder: '*البريد الإلكتروني'
          },
          {
            name: 'country',
            placeholder: 'البلد'
          },
          {
            name: 'comments',
            placeholder: '*تعليقات'
          }
        ],
        buttons: [
          {
            text: 'إلغاء',
            role: 'cancel',
            handler: data => {
             // console.log('Cancel clicked');
            }
          },
          {
            text: 'أرسل',
            handler: data => {

              if(data.comments.length<3 || !this.validateEmail(data.email)){
                this.alertIt("خطأ","خطأ في كتابة البريد الإلكتروني أو التعليقات");
                return false;
              }

               this.sendEmail(data.name,data.email,data.comments,data.country,t);
            }
          }
        ]
      });
      alert.present();
    }

  sendEmail(n,e,c,ct,t){
    var link = 'http://arabicprograms.org/api/opinion.php';
    var myData = JSON.stringify({name: n,email: e, comments: c,country: ct,track: t});

    this.http.post(link, myData)
   .subscribe(data => {
      //alert (data["_body"]);
      this.alertIt('','تم إرسال الرسالة بنجاح');     
   }, error => {
    this.alertIt('خطأ','فشلت العملية ، يرجى المحاولة مرة أخرى في وقت لاحق');
  
   });
  
  }
  
  alertIt(t,s){
    let alert = this.alertCtrl.create({
      title: t,
      subTitle: s,
      buttons: ['تابع']
    });
    alert.present();
  }
  
  goToLiveStream(){
    //this.app.getActiveNav().parent.select(1)
   
    let view = this.navCtrl.getActive();
    if ( view.instance instanceof ListenNowPage ){
      this.navCtrl.remove(1);
    }else{
      this.navCtrl.push (ListenNowPage);
    }

  }

  
  setPlayLogo(){
    let hl=document.getElementById("header-logo") as HTMLImageElement;
    hl.src="assets/imgs/logo-play.png";
  }

  removePlayLogo(){
    let hl=document.getElementById("header-logo") as HTMLImageElement;
    hl.src="assets/imgs/logo.png";
  }


  goToPlayer(){
    
    let p =document.getElementById('playing') as HTMLInputElement;
    if(p.value=="-1" || p.value=="2")
     return false;
    
     let view = this.navCtrl.getActive();
    if ( view.instance instanceof PlayerPage ){
      this.navCtrl.remove(1);
    }else{
      this.navCtrl.push (PlayerPage);
    }

  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

  
}
