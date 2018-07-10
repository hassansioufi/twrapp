import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UniquePage } from './unique';

@NgModule({
  declarations: [
    UniquePage,
  ],
  imports: [
    IonicPageModule.forChild(UniquePage),
  ],
})
export class UniquePageModule {}
