import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import {Observable, of} from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../shared/baseUrl';
import { ProcessHttpMsgService } from './process-http-msg.service';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseUrl+'promotions').pipe
    (
      catchError(this.processHttpMsgService.handleError)
    );
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseUrl+'promotions/'+id)
    .pipe
    (
      catchError(this.processHttpMsgService.handleError)
    );
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseUrl+'promotions?featured=true').pipe(map(promotions=>promotions[0])).pipe
    (
      catchError(this.processHttpMsgService.handleError)
    );

   }

  constructor(private http:HttpClient,private processHttpMsgService:ProcessHttpMsgService) { }
}
