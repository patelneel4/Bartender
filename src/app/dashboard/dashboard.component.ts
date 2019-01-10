import { Component, OnInit } from '@angular/core';
import { Liquid } from '../liquid';
import { LiquidService } from '../liquid.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
liquids: Liquid[] = [];

  constructor(private liquidService: LiquidService) { }

  ngOnInit() {
    this.getLiquids();
  }

  getLiquids(): void {
    this.liquidService.getLiquids()
    .subscribe(liquids => this.liquids = liquids.slice(1, 5));
  }

}
