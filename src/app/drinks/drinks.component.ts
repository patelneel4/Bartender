import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Drink } from '../drink';
import { DrinkService } from '../drinks.service';
import { Ingredient } from '../ingredient';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  drinks: Drink[] = [];

  constructor(private drinkService: DrinkService,
              private modalService: NgbModal ) {}

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks(): void {
    this.drinkService.getDrinks()
    .subscribe(drinks => this.drinks = drinks);
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
