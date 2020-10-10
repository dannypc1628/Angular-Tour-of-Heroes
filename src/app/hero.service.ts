import { HEROES } from './mock-heroes';
import { Hero } from './hero';
import { MessageService } from './message.service';

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService：獲取的英雄');
    return of(HEROES);
  }
}
