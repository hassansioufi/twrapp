import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProgramslistPage } from './programslist';

@NgModule({
  declarations: [
    ProgramslistPage,
  ],
  imports: [
    IonicPageModule.forChild(ProgramslistPage),
  ],
})
export class ProgramslistPageModule {}
