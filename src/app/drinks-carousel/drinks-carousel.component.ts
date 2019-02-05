import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Drink } from '../drink';
import { DrinkService } from '../drinks.service';

@Component({
  selector: 'app-drinks-carousel',
  templateUrl: './drinks-carousel.component.html',
  styleUrls: ['./drinks-carousel.component.css'],
  providers: [NgbCarouselConfig],  // add NgbCarouselConfig to the component providers
})

export class DrinksCarouselComponent {
  drinks: Drink[] = [];

  constructor(private drinkService: DrinkService, config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 5000;
    config.showNavigationArrows = true;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    this.getDrinks();
  }

  getDrinks(): void {
    this.drinkService.getDrinks()
    .subscribe(drinks => this.drinks = drinks);
  }
}