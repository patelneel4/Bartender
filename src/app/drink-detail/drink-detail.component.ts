import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Drink } from '../drink';
import { DrinkService } from '../drinks.service';
import { LiquidService } from '../liquid.service';
import { Liquid } from '../liquid';


@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.css']
})
export class DrinkDetailComponent implements OnInit {
@Input() drink: Drink;
@Input() liquid: Liquid;
@Input() drinkID: number; // Passed as a parameter when loading as a component


  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    private liquidService: LiquidService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getDrink();
  }

  getDrink(): void {
    // This gives us the ability to load as a whole page (with the id in the url) or load as a component (with a parameter)
    let id;
    if ( this.drinkID === undefined ) {
       id = +this.route.snapshot.paramMap.get('id');
    } else {
      id = this.drinkID;
    }
    this.drinkService.getDrink(id)
    .subscribe(drink => this.drink = drink);
  }

  getLiquid(id): void {
   this.liquidService.getLiquid(id)
    .subscribe(x => this.liquid = x).unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.drinkService.updateDrink(this.drink)
    .subscribe();
  }

  toArray(answers: object) {
    return Object.keys(answers).map(key => answers[key]);
  }
}
