import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Liquid } from '../liquid';
import { LiquidService } from '../liquid.service';
import { Pump } from '../pump';
import { PumpsService } from '../pumps.service';

@Component({
  selector: 'app-liquids',
  templateUrl: './liquids.component.html',
  styleUrls: ['./liquids.component.css']
})
export class LiquidsComponent implements OnInit {
  liquids: Liquid[];
  pumps: Pump[];

  constructor(private pumpService: PumpsService, private liquidService: LiquidService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getLiquids();
    this.getPumps();
  }

  getLiquids(): void {
    this.liquidService.getLiquids()
    .subscribe(liquids => this.liquids = liquids);
    for (let l of this.liquids) {
      let pump = this.pumps.find(({ liquid }) => liquid === l.id);
      l.pump = pump.name;
    };
  }

  getPumps(): void {
    this.pumpService.getPumps()
    .subscribe(pumps => this.pumps = pumps);
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


