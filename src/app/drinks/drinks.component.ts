import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Drink } from '../drink';
import { DrinkService } from '../drinks.service';

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
  }

  //Modal Open
  open(content) {
    this.modalService.open(content);
  }

}
