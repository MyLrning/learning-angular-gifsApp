import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('searchBox') searchBox!:ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) {}


  search() {
    let searchTerm = this.searchBox.nativeElement.value;
    
    searchTerm.trim().length > 0 
      ?(this.gifsService.addToHistory(searchTerm),
        this.searchBox.nativeElement.value = '',
        this.gifsService.searchGifs(searchTerm))
      : null;
  }

}
