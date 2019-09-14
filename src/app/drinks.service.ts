import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Drink, DrinkQueue } from './drink';
import { MessageService } from './message.service';

const API_URL = environment.apiUrl;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class DrinkService {

  private drinksUrl = `${API_URL}/api/drinks`;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET drinks from the server */
  async getDrinks (): Promise<Drink[]>{
    const url = `${this.drinksUrl}/all`;
    const reponse = await this.http.get<Drink[]>(url).toPromise();
    return reponse;
  }

  /** GET drink by id. Return `undefined` when id not found */
  getDrinkNo404<Data>(id: number): Observable<Drink> {
    const url = `${this.drinksUrl}/?id=${id}`;
    return this.http.get<Drink[]>(url)
      .pipe(
        map(drinks => drinks[0]), // returns a {0|1} element array
        tap(l => {
          const outcome = l ? `fetched` : `did not find`;
          this.log(`${outcome} drink id=${id}`);
        }),
        catchError(this.handleError<Drink>(`getdrink id=${id}`))
      );
  }

  /** GET drink by id. Will 404 if id not found */
  async getDrink(id: number): Promise<Drink> {
    const url = `${this.drinksUrl}/${id}`;
    const reponse = await this.http.get<Drink>(url).toPromise();
    return reponse;
  }

  /* GET drinkes whose name contains search term */
  searchDrinks(query: string): Observable<Drink[]> {
    if (!query.trim()) {
      // if not search term, return empty drink array.
      return of([]);
    }
    return this.http.get<Drink[]>(`${this.drinksUrl}/?query=${query}`).pipe(
      tap(_ => this.log(`found drinks matching "${query}"`)),
      catchError(this.handleError<Drink[]>('searchdrinks', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new drink to the server */
  addDrink (drink: Drink): Observable<Drink> {
    const url = `${this.drinksUrl}/create`;
    return this.http.post<Drink>(url, drink, httpOptions).pipe(
      tap((l: Drink) => this.log(`added drink w/ id=${l.id}`)),
      catchError(this.handleError<Drink>('adddrink'))
    );
  }

  /** DELETE: delete the drink from the server */
  deleteDrink (drink: Drink | number): Observable<Drink> {
    const id = typeof drink === 'number' ? drink : drink.id;
    const url = `${this.drinksUrl}/delete/${id}`;

    return this.http.delete<Drink>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted drink id=${id}`)),
      catchError(this.handleError<Drink>('deletedrink'))
    );
  }

  /** PUT: update the drink on the server */
  updateDrink (drink: Drink): Observable<Drink> {
    const url = `${this.drinksUrl}/update`;
    return this.http.post(url, drink, httpOptions).pipe(
      tap(_ => this.log(`updated drink id=${drink.id}`)),
      catchError(this.handleError<any>('updatedrink'))
    );
  }

 async addDrinkToQueue(id: number) {
    const url = `${this.drinksUrl}/addDrinkToQueue/${id}`;
    const reponse = await this.http.post(url,null).toPromise();
    return reponse;
  }

 async deleteDrinkFromQueue (id :number) {
    const url = `${this.drinksUrl}/deleteDrinkFromQueue/${id}`;
    const reponse = await this.http.delete(url,httpOptions).toPromise();
  }

   /** GET drinksQueue from the server */
   async getDrinksQueue (): Promise<DrinkQueue[]>{
    const url = `${this.drinksUrl}/all/getDrinksQueue`;
    const reponse = await this.http.get<DrinkQueue[]>(url).toPromise();
    return reponse;
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

  /** Log a drinkService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`drinkService: ${message}`);
  }
}
