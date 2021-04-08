import { Component, OnInit ,Inject} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish-service.service';
import { BasePortalOutlet } from '@angular/cdk/portal';
import {baseUrl} from '../shared/baseUrl';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  baseurl : string = baseUrl;
  constructor(private dishService: DishService,
    @Inject('BaseURL') private baseURL : typeof baseUrl) {
    
   }
   dishes?: Dish[];
   
  
   ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes);
    
   
  }
  

  
}
