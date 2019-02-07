import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Pump } from '../pump';
import { PumpsService } from '../pumps.service';

@Component({
  selector: 'app-pumps',
  templateUrl: './pumps.component.html',
  styleUrls: ['./pumps.component.css']
})
export class PumpsComponent implements OnInit {
  pumps: Pump[];

  constructor(private pumpService: PumpsService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getPumps();
  }

  getPumps(): void {
    this.pumpService.getPumps()
    .subscribe(pumps => this.pumps = pumps);
  }

  // add(id: number,  name: string, flowrate: number, liquid: number): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.pumpService.addPump({ id, name, flowrate, liquid  } as Pump)
  //     .subscribe(pump => {
  //       this.pumps.push(pump);
  //     });
  // }

  delete(pump: Pump): void {
    this.pumps = this.pumps.filter(h => h !== pump);
    this.pumpService.deletepump(pump).subscribe();
  }

  //Modal Open
  open(content) {
    this.modalService.open(content);
  }

}
