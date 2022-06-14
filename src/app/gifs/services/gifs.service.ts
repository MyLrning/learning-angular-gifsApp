import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private api : string = 'api.giphy.com/v1/gifs/search';
  private apiKey : string = '304MLMhyTm5sP29o1VjXBd3XY8LVyBQn';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor( private http: HttpClient ) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
  }

  searchGifs(query: string) {
    return this.http.get<SearchResponse>(
      `https://${this.api}?api_key=${this.apiKey}&q=${query}&limit=20`)
      .subscribe((resp: SearchResponse) => {
        console.log(resp.data);
        this.results = resp.data;
      })
  }

  addToHistory(query: string) {
    this._history.length < 10
      ? !this._history.includes(query[0].toUpperCase() + query.slice(1))
        ? this._history.unshift(query[0].toUpperCase() + query.slice(1))
        : null
      : (this._history.pop(),
        this._history.unshift(query[0].toUpperCase() + query.slice(1)))
      
      localStorage.setItem('history', JSON.stringify(this._history));
  }
  removeFromHistory(query: string) {
    this._history = this._history.filter((item) => item !== query);
  }
  clearHistory() {
    this._history = [];
  }
  searchAgain(query: string) {
    this.searchGifs(query);
  }
}
