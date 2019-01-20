import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Drink } from '../drink';
import { DrinkService } from '../drinks.service';
@Component({
  selector: 'app-drink-detail',
  templateUrl: './drink-detail.component.html',
  styleUrls: ['./drink-detail.component.css']
})
export class DrinkDetailComponent implements OnInit {
@Input() drink: Drink;
  constructor(
    private route: ActivatedRoute,
    private drinkService: DrinkService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getDrink();
  }

  getDrink(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.drinkService.getDrink(id)
    .subscribe(drink => this.drink = drink);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.drinkService.updateDrink(this.drink)
    .subscribe(() => this.goBack());
  }
}
