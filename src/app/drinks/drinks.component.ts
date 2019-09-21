import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Drink, DrinkQueue } from '../drink';
import { DrinkService } from '../drinks.service';
import { Ingredient } from '../ingredient';
import { Pump } from '../pump';
import { PumpsService } from '../pumps.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css'],
})
export class DrinksComponent implements OnInit {
  drinks: Drink[] = [];
  pumps: Pump[] = [];
  drinkQueue: DrinkQueue[] =[];
  pourMessage: String;
  showPourButtons: Boolean = false;


  constructor(private drinkService: DrinkService,
    private modalService: NgbModal,
    private pumpService: PumpsService) { }

  ngOnInit() {
    this.getDrinks();
    this.getPumps();
  }

  getPumps(): void {
    this.pumpService.getPumps()
      .subscribe(pumps => this.pumps = pumps);
  }


  async getDrinks() {
    this.drinks = await this.drinkService.getDrinks()
  }

  get getDrinksFunc(){
    return this.getDrinks.bind(this);
  }

  async checkDrinkQueue(i: number){
    this.drinkQueue = await this.drinkService.getDrinksQueue();
    if (this.drinkQueue.length > 0) {
      this.showPourButtons =true;
    this.pourMessage = "There is a drink currently being poured, please wait..."
    }else{
      this.showPourButtons =false
     let drink = this.drinks.find(({ id }) => id === i);
     this.pourMessage = "Would you like to pour "+drink.name+"?";
    }
  }

  async pourDrink(i: number) {
    let drink: Drink;


   
    if (this.drinkQueue.length < 1) {
      drink = this.drinks.find(({ id }) => id === i)
      this.drinkService.addDrinkToQueue(drink.id);
      this.pourMessage = "Would you like to pour "+drink.name+"?";
      for (let ingredient of drink.ingredients) {
        let pump = this.pumps.find(({ liquid }) => liquid === ingredient.liquid);
        let time = ingredient.volume / pump.flowrate;
        const status = this.pumpService.runPump(pump.id, time);
      };
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

}
