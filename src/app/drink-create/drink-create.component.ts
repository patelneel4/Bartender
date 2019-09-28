import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
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
  @Input() getDrinks: Function;
  @Input() close: Function;
  items: Ingredient[] = [new Ingredient];
  liquids: Liquid[];

  constructor(private drinkService: DrinkService,
              private liquidService: LiquidService) { }

  ngOnInit() {
    this.getLiquids();
  }

  ngOnDestroy() {
    this.getDrinks();
  }

  addInputItem(): void {
    this.items.push(new Ingredient);
  };

  removeInputItem(): void {
    this.items.pop();
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

  async getLiquids() {
    this.liquids =  await this.liquidService.getLiquids();
  }

  updateList(): void {

  }

}
