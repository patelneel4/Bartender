import { Component, OnInit } from '@angular/core';
import { Liquid } from '../liquid';
import { LiquidService } from '../liquid.service';
import { Drink } from '../drink';
import { DrinkService } from '../drinks.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
liquids: Liquid[] = [];
drinks: Drink[] = [];

  constructor(private liquidService: LiquidService, private drinkService: DrinkService) { }

  ngOnInit() {
    this.getLiquids();
    this.getDrinks();
  }

  getLiquids(): void {
    this.liquidService.getLiquids()
    .subscribe(liquids => this.liquids = liquids.slice(0, 4));
  }
  getDrinks(): void {
    this.drinkService.getDrinks()
    .subscribe(drinks => this.drinks = drinks.slice(0, 4));
  }

}
