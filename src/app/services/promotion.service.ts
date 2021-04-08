import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../shared/baseUrl';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  getPromotions(): Observable<Promotion[]> {
    return this.http.get<Promotion[]>(baseUrl+'promotions');
  }

  getPromotion(id: string): Observable<Promotion> {
    return this.http.get<Promotion>(baseUrl+'promotions/'+id);
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get<Promotion[]>(baseUrl+'promotions?featured=true').pipe(map(promotions=>promotions[0]));

   }

  constructor(private http:HttpClient) { }
}
