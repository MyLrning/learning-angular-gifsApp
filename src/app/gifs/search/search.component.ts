import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent {

  @ViewChild('searchBox') searchBox!:ElementRef<HTMLInputElement>;

  search() {
    let searchTerm = this.searchBox.nativeElement.value;

    console.log(searchTerm);

    this.searchBox.nativeElement.value = ''
  }

}
