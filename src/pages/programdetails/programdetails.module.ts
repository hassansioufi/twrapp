import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgramdetailsPage } from './programdetails';

@NgModule({
  declarations: [
    ProgramdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgramdetailsPage),
  ],
})
export class ProgramdetailsPageModule {}
