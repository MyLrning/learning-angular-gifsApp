import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private api: string = 'https://api.giphy.com/v1/gifs/';
  private apiKey: string = '304MLMhyTm5sP29o1VjXBd3XY8LVyBQn';
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    this.results =
      JSON.parse(localStorage.getItem('results')!) || this.searchGifs('freak');
  }

  searchGifs(query: string) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '20')
      .set('q', query);
    this.http
      .get<SearchResponse>(
        `${this.api}search`, { params }
      )
      .subscribe((resp: SearchResponse) => {
        this.results = resp.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }

  addToHistory(query: string) {
    this._history.length < 10
      ? !this._history.includes(query[0].toUpperCase() + query.slice(1))
        ? this._history.unshift(query[0].toUpperCase() + query.slice(1))
        : null
      : (this._history.pop(),
        this._history.unshift(query[0].toUpperCase() + query.slice(1)));

    localStorage.setItem('history', JSON.stringify(this._history));
  }
  removeFromHistory(query: string) {
    this._history = this._history.filter((item) => item !== query);
  }
  clearHistory() {
    this._history = [];
    localStorage.removeItem('history');
  }
  searchAgain(query: string) {
    this.searchGifs(query);
  }
}
