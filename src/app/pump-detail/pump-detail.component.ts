import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Pump } from '../pump';
import { PumpsService } from '../pumps.service';
import { LiquidService } from '../liquid.service';
import { Liquid } from '../liquid';

@Component({
  selector: 'app-pump-detail',
  templateUrl: './pump-detail.component.html',
  styleUrls: ['./pump-detail.component.css']
})
export class PumpDetailComponent implements OnInit {
  @Input() pump: Pump;
  @Input() liquids: Liquid[];

  constructor(
    private route: ActivatedRoute,
    private pumpService: PumpsService,
    private liquidService: LiquidService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getPump();
    this.getLiquids();
  }

  getPump(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.pumpService.getPump(id)
    .subscribe(pump => this.pump = pump);
  }

  getLiquids(): void {
    this.liquidService.getLiquids()
    .subscribe(liquids => this.liquids = liquids);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.pumpService.updatePump(this.pump)
    .subscribe();
  }

}
