import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

 import { Liquid } from '../liquid';
 import { LiquidService } from '../liquid.service';

@Component({
  selector: 'app-liquid-search',
  templateUrl: './liquid-search.component.html',
  styleUrls: ['./liquid-search.component.css']
})
export class LiquidSearchComponent implements OnInit {
  liquids$: Observable<Liquid[]>;
  private searchTerms = new Subject<string>();

  constructor(private liquidService: LiquidService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.liquids$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.liquidService.searchLiquids(term)),
    );
  }
}
