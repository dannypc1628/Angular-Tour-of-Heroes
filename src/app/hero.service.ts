import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { MessageService } from './message.service';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';

  constructor(private http: HttpClient
          , private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.log('獲取的英雄');
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/{id}`;
    this.log(`獲取指定英雄資料id=${id}`);
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => (this.log(`fetched ${id} hero`),
          catchError(this.handleError<Hero>('getHero id=${id}'))
        )));
  }

  private log(message: string):void {
    this.messageService.add(`HeroService：${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (err: any): Observable<T> => {
      console.error(err);
      this.log(`${operation} failed: ${err.message}`);
      return of(result as T);
    };
  }
}
