import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Pump } from './pump';
import { MessageService } from './message.service';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class PumpsService {

  private pumpsUrl = `${API_URL}/api/pumps`;  // URL to pump api
  private pinUrl = `${API_URL}/api/pin`; // URL to gpio api
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET pumps from the server */
  getPumps (): Observable<Pump[]> {
    const url = `${this.pumpsUrl}/all`;
    return this.http.get<Pump[]>(url)
      .pipe(
        tap(_ => this.log('fetched pumps')),
        catchError(this.handleError('getPumps', []))
      );
  }

  /** GET pump by id. Return `undefined` when id not found */
  getPumpNo404<Data>(id: number): Observable<Pump> {
    const url = `${this.pumpsUrl}/?id=${id}`;
    return this.http.get<Pump[]>(url)
      .pipe(
        map(pumps => pumps[0]), // returns a {0|1} element array
        tap(l => {
          const outcome = l ? `fetched` : `did not find`;
          this.log(`${outcome} pump id=${id}`);
        }),
        catchError(this.handleError<Pump>(`getPump id=${id}`))
      );
  }

  /** GET pump by id. Will 404 if id not found */
  getPump(id: number): Observable<Pump> {
    const url = `${this.pumpsUrl}/${id}`;
    return this.http.get<Pump>(url).pipe(
      tap(_ => this.log(`fetched pump id=${id}`)),
      catchError(this.handleError<Pump>(`getPump id=${id}`))
    );
  }

  /* GET pumpes whose name contains search term */
  searchPumps(query: string): Observable<Pump[]> {
    if (!query.trim()) {
      // if not search term, return empty pump array.
      return of([]);
    }
    return this.http.get<Pump[]>(`${this.pumpsUrl}/?query=${query}`).pipe(
      tap(_ => this.log(`found pumps matching "${query}"`)),
      catchError(this.handleError<Pump[]>('searchpumps', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new pump to the server */
  addPump (pump: Pump): Observable<Pump> {
    const url = `${this.pumpsUrl}/create`;
    return this.http.post<Pump>(url, pump, httpOptions).pipe(
      tap((l: Pump) => this.log(`added pump w/ id=${l.id}`)),
      catchError(this.handleError<Pump>('addpump'))
    );
  }

  /** DELETE: delete the pump from the server */
  deletepump (pump: Pump | number): Observable<Pump> {
    const id = typeof pump === 'number' ? pump : pump.id;
    const url = `${this.pumpsUrl}/delete/${id}`;

    return this.http.delete<Pump>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted pump id=${id}`)),
      catchError(this.handleError<Pump>('deletepump'))
    );
  }

  /** PUT: update the pump on the server */
  updatePump (pump: Pump): Observable<Pump> {
    const url = `${this.pumpsUrl}/update`;
    return this.http.post<Pump>(url, pump, httpOptions).pipe(
      tap(_ => this.log(`updated pump id=${pump.id}`)),
      catchError(this.handleError<any>('updatepump'))
    );
  }

  calibratePump(pump: Pump, time: number): Observable<Pump> {
    const url = `${this.pinUrl}/set`;
    const payload = {'gpio': pump.id, 'time': time};
    return this.http.post(url, payload, httpOptions).pipe(
      tap(_ => this.log(`triggered gpio=${pump.id} for ${time} seconds`)),
      catchError(this.handleError<any>('updatepump'))
    );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a pumpService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`pumpService: ${message}`);
  }
}
