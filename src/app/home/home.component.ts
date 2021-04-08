import { Component, OnInit,Inject } from '@angular/core';

import { DISHES } from '../shared/dishes';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish-service.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import {baseUrl} from '../shared/baseUrl'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish?: Dish;
  promotion?: Promotion;
  leader? : Leader;
  baseurl : string = baseUrl;
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService : LeaderService,
    @Inject('BaseURL') private baseURL : typeof baseUrl) { }

  ngOnInit() {
    this.dishservice.getFeaturedDish().subscribe(dish=>this.dish=dish);
    this.promotionservice.getFeaturedPromotion().subscribe(promotion=>this.promotion=promotion);
    this.leaderService.getFeaturedLeader().subscribe(leader=> this.leader= leader);
  }
  

}
