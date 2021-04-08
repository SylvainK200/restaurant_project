import { Injectable } from '@angular/core';
import {Dish} from "../shared/dish";
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
import {map,catchError} from 'rxjs/operators';
import {ProcessHttpMsgService} from './process-http-msg.service';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private http:HttpClient,private processHttpMsgService:ProcessHttpMsgService) { }
  getDishes():Observable<Dish[]>{
    return this.http.get<Dish[]>(baseUrl+'dishes').pipe
    (
      catchError(this.processHttpMsgService.handleError)
    );
  }

  getDish(id: string):Observable<Dish> {
    return this.http.get<Dish>(baseUrl+'dishes/'+id).pipe
    (
      catchError(this.processHttpMsgService.handleError)
    );
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseUrl+'dishes?featured=true').pipe(map(dishes=>dishes[0])).pipe
    (
      catchError(this.processHttpMsgService.handleError)
    ) ;
  }

  getDishId():Observable<String[]|any>{
    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
