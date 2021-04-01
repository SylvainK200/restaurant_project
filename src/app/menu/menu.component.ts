import { Component, OnInit } from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish-service.service'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private dishService: DishService) {
   }
   dishes?: Dish[];
   selectedDish ?:Dish;
  
   ngOnInit(): void {
    this.dishService.getDishes()
    .then(dishes => this.dishes = dishes);
    
   
  }
  

  onSelect(dish:Dish){
    this.selectedDish=dish;
  }
}
