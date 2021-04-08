import { Component, Inject, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { baseUrl } from '../shared/baseUrl';
import { Leader } from '../shared/leader';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  leaders? : Leader[];
  baseurl : string = baseUrl;
  constructor(private leaderService:LeaderService,
    @Inject('BaseURL') private baseURL : typeof baseUrl) { }

  ngOnInit(): void {
   this.leaderService.getLeaders().subscribe(leaders=>this.leaders=leaders);
  }

}
