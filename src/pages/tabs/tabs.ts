import { Component } from '@angular/core';

import { BiblePage } from '../bible/bible';
import { ProgramsPage } from '../programs/programs';
import { HomePage } from '../home/home';
import { MorePage } from '../more/more';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BiblePage;
  tab3Root = ProgramsPage;
  tab4Root = MorePage;
  
  
  constructor() {
    
  }
}
