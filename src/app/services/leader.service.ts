import { Injectable } from '@angular/core';
import {LEADERS} from '../shared/leaders';
import {Leader} from '../shared/leader';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http : HttpClient) { }

  getLeaders():Observable<Leader[]> {
    return this.http.get<Leader[]>(baseUrl+'leadership');

  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseUrl+'leadership?featured=true').pipe(map(leaders=>leaders[0]));
  }
}
