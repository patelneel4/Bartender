import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Drink } from '../drink';
import { DrinkService } from '../drinks.service';
import { LiquidService } from '../liquid.service';
import { Liquid } from '../liquid';
import { Ingredient } from '../ingredient';
import { Pump } from '../pump';
import { PumpsService } from '../pumps.service';
import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'app-pour-detail',
  templateUrl: './pour-detail.component.html',
  styleUrls: ['./pour-detail.component.css']
})
export class PourDetailComponent implements OnInit {
@Input() drinkID: number; // Passed as a parameter when loading as a component
@Input() drinks: Drink[];
@Input() pumps: Pump[];
drink: Drink;

constructor(private drinkService: DrinkService,
  private modalService: NgbModal,
  private route: ActivatedRoute,) {}

ngOnInit(): void {

  this.pourDetail();
}

pourDetail(): void {
  // This gives us the ability to load as a whole page (with the id in the url) or load as a component (with a parameter)
  let i;

  if ( this.drinkID === undefined ) {
     i = +this.route.snapshot.paramMap.get('id');
  } else {
    i = this.drinkID;
  }

this.drink = this.drinks.find(({id})=> id === i )

  for(let ingredient of this.drink.ingredients){
    let pump = this.pumps.find(({liquid})=> liquid === ingredient.liquid);
    ingredient.leftTime = ingredient.volume / pump.flowrate;
  };


}

  
}
