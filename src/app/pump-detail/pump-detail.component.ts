import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Pump } from '../pump';
import { PumpsService } from '../pumps.service';
import { LiquidService } from '../liquid.service';
import { Liquid } from '../liquid';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pump-detail',
  templateUrl: './pump-detail.component.html',
  styleUrls: ['./pump-detail.component.css']
})
export class PumpDetailComponent implements OnInit {
  @Input() pump: Pump;
  @Input() liquids: Liquid[];
  @Input() pumpID: number; // Passed as a parameter when loading as a component

  constructor(
    private route: ActivatedRoute,
    private pumpService: PumpsService,
    private liquidService: LiquidService,
    private location: Location,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.getPump();
    this.getLiquids();
  }

  getPump(): void {
    // This gives us the ability to load as a whole page (with the id in the url) or load as a component (with a parameter)
    let id;
    if (this.pumpID === undefined) {
       id = +this.route.snapshot.paramMap.get('id');
    } else {
      id = this.pumpID;
    }

    this.pumpService.getPump(id)
    .subscribe(pump => this.pump = pump);
  }

  getLiquids(): void {
    this.liquidService.getLiquids()
    .subscribe(liquids => this.liquids = liquids);
  }
  async calibratePump(pump: Pump) {
    this.spinner.show();
   const status = await this.pumpService.calibratePump(pump, 10);
   console.log('Finished running calibration');
   this.spinner.hide();
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.pumpService.updatePump(this.pump)
    .subscribe();
  }
}
