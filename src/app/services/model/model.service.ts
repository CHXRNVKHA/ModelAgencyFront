import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { Model } from 'src/app/interfaces/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private modelsUrl = 'api/models';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    ) { }

  /** GET heroes from the server */
  getModels(): Observable<any[]> {
    return this.http.get<any[]>(this.modelsUrl)
      .pipe(
        catchError(this.handleError<any[]>('getModels', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getModelNo404<Data>(id: number): Observable<any> {
    const url = `${this.modelsUrl}/?id=${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(models => models[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<any>(`getModel id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getModel(id: number): Observable<any> {
    const url = `${this.modelsUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getModel id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchModels(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.modelsUrl}/?name=${term}`).pipe(
      catchError(this.handleError<any[]>('searchModels', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addModel(model: Model): Observable<any> {
    console.log('m', model);
    return this.http.post<any>(this.modelsUrl, model, this.httpOptions).pipe(
      catchError(this.handleError<any>('addModel'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteModel(id: number): Observable<any> {
    const url = `${this.modelsUrl}/${id}`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteModel'))
    );
  }

  /** PUT: update the hero on the server */
  updateModel(model: Model): Observable<any> {
    return this.http.put(this.modelsUrl, model, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateModel'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
