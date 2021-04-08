import { Injectable } from '@angular/core';
import {Dish} from "../shared/dish";
import {DISHES} from "../shared/dishes";
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../shared/baseUrl';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor( private http:HttpClient) { }
  getDishes():Observable<Dish[]>{
    return this.http.get<Dish[]>(baseUrl+'dishes');
  }

  getDish(id: string):Observable<Dish> {
    return this.http.get<Dish>(baseUrl+'dishes/'+id);
  }

  getFeaturedDish(): Observable<Dish> {
    return this.http.get<Dish[]>(baseUrl+'dishes?featured=true').pipe(map(dishes=>dishes[0])) ;
  }

  getDishId():Observable<String[]|any>{
    return this.getDishes().pipe(map(dishes=>dishes.map(dish=>dish.id)));
    
  }
}
 