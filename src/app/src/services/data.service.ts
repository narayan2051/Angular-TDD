import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getHomes$(): any {
    //ToDo: real http call
    return this.httpClient.get<any>('assets/home.json');
  }

  bookHome$(): any {
    console.log('Hello');
     return this.httpClient.post(
      'https://run.mocky.io/v3/9eb29e55-2b97-44c5-a68e-65f17edb0fda',
      {}
    );
    // return of(null);
  }
}
