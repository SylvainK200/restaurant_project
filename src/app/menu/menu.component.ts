import { Component, OnInit ,Inject} from '@angular/core';
import {Dish} from '../shared/dish';
import {DishService} from '../services/dish-service.service';
import {expand, flyInOut} from '../animations/app.animation';
import {baseUrl} from '../shared/baseUrl';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  host: {
    '[@flyInOut]':'true',
    'style':'display:block'
  },
  animations:[
    flyInOut(),
    expand()
  ]
})
export class MenuComponent implements OnInit {
  baseurl : string = baseUrl;
  constructor(private dishService: DishService,
    @Inject('BaseURL') private baseURL : typeof baseUrl) {
    
   }
   dishes?: Dish[];
   errMess ?: string;
  
   ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errMess => this.errMess=<any>errMess 
      );
    
   
  }
  

  
}
