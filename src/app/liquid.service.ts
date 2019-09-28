import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Liquid } from './liquid';
import { MessageService } from './message.service';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class LiquidService {

  private liquidsUrl = `${API_URL}/api/liquids`;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET liquids from the server */
  async getLiquids (): Promise<Liquid[]> {
    const url = `${this.liquidsUrl}/all`;
    const reponse = await this.http.get<Liquid[]>(url).toPromise();
    return reponse;

  }

  /** GET liquid by id. Return `undefined` when id not found */
  getLiquidNo404<Data>(id: number): Observable<Liquid> {
    const url = `${this.liquidsUrl}/?id=${id}`;
    return this.http.get<Liquid[]>(url)
      .pipe(
        map(liquids => liquids[0]), // returns a {0|1} element array
        tap(l => {
          const outcome = l ? `fetched` : `did not find`;
          this.log(`${outcome} liquid id=${id}`);
        }),
        catchError(this.handleError<Liquid>(`getLiquid id=${id}`))
      );
  }

  /** GET liquid by id. Will 404 if id not found */
  getLiquid(id: number): Observable<Liquid> {
    const url = `${this.liquidsUrl}/${id}`;
    return this.http.get<Liquid>(url).pipe(
      tap(_ => this.log(`fetched liquid id=${id}`)),
      catchError(this.handleError<Liquid>(`getLiquid id=${id}`))
    );
  }

  /* GET liquides whose name contains search term */
  searchLiquids(query: string): Observable<Liquid[]> {
    if (!query.trim()) {
      // if not search term, return empty liquid array.
      return of([]);
    }
    return this.http.get<Liquid[]>(`${this.liquidsUrl}/?query=${query}`).pipe(
      tap(_ => this.log(`found liquids matching "${query}"`)),
      catchError(this.handleError<Liquid[]>('searchliquids', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new liquid to the server */
  addLiquid (liquid: Liquid): Observable<Liquid> {
    const url = `${this.liquidsUrl}/create`;
    return this.http.post<Liquid>(url, liquid, httpOptions).pipe(
      tap((l: Liquid) => this.log(`added liquid w/ id=${l.id}`)),
      catchError(this.handleError<Liquid>('addliquid'))
    );
  }

  /** DELETE: delete the liquid from the server */
  deleteliquid (liquid: Liquid | number): Observable<Liquid> {
    const id = typeof liquid === 'number' ? liquid : liquid.id;
    const url = `${this.liquidsUrl}/delete/${id}`;

    return this.http.delete<Liquid>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted liquid id=${id}`)),
      catchError(this.handleError<Liquid>('deleteliquid'))
    );
  }

  /** PUT: update the liquid on the server */
  updateliquid (liquid: Liquid): Observable<any> {
    const url = `${this.liquidsUrl}/update`;
    return this.http.put(url, liquid, httpOptions).pipe(
      tap(_ => this.log(`updated liquid id=${liquid.id}`)),
      catchError(this.handleError<any>('updateliquid'))
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

  /** Log a liquidService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`liquidService: ${message}`);
  }
}
