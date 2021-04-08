import { Injectable } from '@angular/core';
import {LEADERS} from '../shared/leaders';
import {Leader} from '../shared/leader';
import {Observable, of} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http : HttpClient,private processHttpMsgService:ProcessHttpMsgService) { }

  getLeaders():Observable<Leader[]> {
    return this.http.get<Leader[]>(baseUrl+'leadership').pipe
    (
      catchError(this.processHttpMsgService.handleError)
    );

  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get<Leader[]>(baseUrl+'leadership?featured=true').pipe(map(leaders=>leaders[0]))
    .pipe
    (
      catchError(this.processHttpMsgService.handleError)
    );
  }
}
