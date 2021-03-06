import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ListenNowPage } from '../pages/listennow/listennow';
import { ProgramPage } from '../pages/program/program';
import { ProgramdetailsPage } from '../pages/programdetails/programdetails';
import { ProgramsPage } from '../pages/programs/programs';
import { HomePage } from '../pages/home/home';
import { MorePage } from '../pages/more/more';
import { SocialPage } from '../pages/social/social';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { MusicPage } from '../pages/music/music';
import { SearchPage } from '../pages/search/search';
import { MyfavoritePage } from '../pages/myfavorite/myfavorite';
import { ProgramslistPage } from '../pages/programslist/programslist';
import { BiblePage } from '../pages/bible/bible';
import { PlayerPage } from '../pages/player/player';
import { ChaptersPage } from '../pages/chapters/chapters';
import { TabsPage } from '../pages/tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { UniquePage } from '../pages/unique/unique';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Network } from '@ionic-native/network';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';


@NgModule({
  declarations: [
    MyApp,
    ListenNowPage,
    ProgramsPage,
    HomePage,
    MorePage,
    SocialPage,
    AboutPage,
    MusicPage,
    ContactPage,
    ProgramPage,
    ProgramdetailsPage,
    MyfavoritePage,
    SearchPage,
    PlayerPage,
    ProgramslistPage,
    BiblePage,
    ChaptersPage,
    UniquePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{backButtonText: ''}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListenNowPage,
    ProgramsPage,
    HomePage,
    MorePage,
    SocialPage,
    AboutPage,
    MusicPage,
    ContactPage,
    ProgramPage,
    ProgramdetailsPage,
    MyfavoritePage,
    SearchPage,
    PlayerPage,
    ProgramslistPage,
    BiblePage,
    ChaptersPage,
    UniquePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    BackgroundMode,
    Network,
    GoogleAnalytics,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}