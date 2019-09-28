import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private pumpService: PumpsService, private liquidService: LiquidService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getLiquids();
  }

  async getLiquids() {
    let pumps = await this.pumpService.getPumps()
    this.liquids = await this.liquidService.getLiquids()
    this.liquids.forEach((l) => {
      let pump = pumps.find(({ liquid }) => liquid === l.id);
      if (pump !== undefined) {
        l.pump = pump.name;
      }
    });
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


