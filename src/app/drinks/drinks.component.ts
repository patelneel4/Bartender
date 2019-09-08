import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Drink } from '../drink';
import { DrinkService } from '../drinks.service';
import { Ingredient } from '../ingredient';
import { Pump } from '../pump';
import { PumpsService } from '../pumps.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  drinks: Drink[] = [];
  pumps: Pump[];


  constructor(private drinkService: DrinkService,
              private modalService: NgbModal,
              private pumpService: PumpsService ) {}

  ngOnInit() {
    this.getDrinks();
    this.getPumps();  
  }

  getPumps(): void {
    this.pumpService.getPumps()
    .subscribe(pumps => this.pumps = pumps);
  }


  getDrinks(): void {
    this.drinkService.getDrinks()
    .subscribe(drinks => this.drinks = drinks);
  }

   pourDrink(i:number) {
    let drink: Drink;

    drink = this.drinks.find(({id})=> id === i )
    for(let ingredient of drink.ingredients){
      let pump = this.pumps.find(({liquid})=> liquid === ingredient.liquid);
      let time = ingredient.volume / pump.flowrate;
      const status = this.pumpService.runPump(pump.id, time);
    }
  
  }

  delete(drink: Drink): void {
    this.drinkService.deleteDrink(drink.id)
    .subscribe();
     this.getDrinks();
  }

  open(content) {
    this.modalService.open(content);
  }

  add(name: string, desc: string): void {
    name = name.trim();
    desc = desc.trim();
    let d : Drink = {
      id: 0,
      name: name,
      description: desc,
      ingredients : null
    };

    if (!name) { return; }
    this.drinkService.addDrink(d)
      .subscribe(drink => {
        this.drinks.push(drink);
      });
      this.getDrinks();
  }

}
