import { Component, OnInit } from '@angular/core';
import { Drink } from '../drink';
import { DrinkService } from '../drinks.service';
import { Ingredient } from '../ingredient';
import { LiquidService } from '../liquid.service';
import { Liquid } from '../liquid';

@Component({
  selector: 'app-drink-create',
  templateUrl: './drink-create.component.html',
  styleUrls: ['./drink-create.component.css']
})
export class DrinkCreateComponent implements OnInit {
  items: Ingredient[] = [new Ingredient];
  liquids: Liquid[];

  constructor(private drinkService: DrinkService,
              private liquidService: LiquidService) { }

  ngOnInit() {
    this.getLiquids();
  }

  addInputItem(): void {
    this.items.push(new Ingredient);
  };

  removeInputItem(): void {
    var test = this.items.pop;
  };

  add(name: string, desc: string): void {
    name = name.trim();
    desc = desc.trim();
    let d: Drink = {
      id: 0,
      name: name,
      description: desc,
      ingredients: this.items
    };
    this.drinkService.addDrink(d)
    .subscribe(drink => {
    });

  }

  getLiquids(): void {
    this.liquidService.getLiquids()
    .subscribe(liquids => this.liquids = liquids);
  }

  updateList(): void {

  }

}
