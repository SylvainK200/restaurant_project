import { Component, Input, OnInit } from '@angular/core';
import {Dish} from "../shared/dish";
import { DishService } from '../services/dish-service.service';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})

export class DishdetailComponent implements OnInit {
  
  dish?: Dish;
  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location) { 
    this.dishservice.getDish("k").then(dish=>this.dish=dish)
      
    }

  ngOnInit() {
    const id =""+this.route.snapshot.params['id'];
    this.dishservice.getDish(id).then(dish=>this.dish=dish);
  }

  goBack(): void {
    this.location.back();
  }


}
