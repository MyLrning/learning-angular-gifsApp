import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent  {
  
  get history( ){
    return this.gifsService.history;
  }

  removeFromHistory( query: string ) {
    this.gifsService.removeFromHistory( query );
  }
  clearHistory() {
    this.gifsService.clearHistory();
  }
  searchAgain(query: string) {
    this.gifsService.searchAgain(query);
  }

  constructor(private gifsService: GifsService) {}

}
