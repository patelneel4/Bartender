import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Liquid } from '../liquid';
import { LiquidService } from '../liquid.service';

@Component({
  selector: 'app-liquids',
  templateUrl: './liquids.component.html',
  styleUrls: ['./liquids.component.css']
})
export class LiquidsComponent implements OnInit {
  liquids: Liquid[];

  constructor(private liquidService: LiquidService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getLiquids();
  }

  getLiquids(): void {
    this.liquidService.getLiquids()
    .subscribe(liquids => this.liquids = liquids);
  }

  add(name: string, brand: string): void {
    name = name.trim();
    brand = brand.trim();
    if (!name) { return; }
    this.liquidService.addLiquid({ name, brand } as Liquid)
      .subscribe(liquid => {
        this.liquids.push(liquid);
      });
  }

  delete(liquid: Liquid): void {
    this.liquids = this.liquids.filter(h => h !== liquid);
    this.liquidService.deleteliquid(liquid).subscribe();
  }

  open(content) {
    this.modalService.open(content);
  }

}


