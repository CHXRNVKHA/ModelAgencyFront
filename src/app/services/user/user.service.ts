import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { Model } from 'src/app/interfaces/model';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private modelsUrl = 'api/models';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  SERVER_URL = environment.SERVER_URL;

  constructor(
    private http: HttpClient,
    ) { }

  /** GET heroes from the server */
  getUsers(): Observable<any[]> {
    return this.http.get<any>(`${this.SERVER_URL}/user`);
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
  getUser(id: number): Observable<any> {
    const url = `${this.SERVER_URL}/user/${id}`;
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
    return this.http.get<any[]>(`${this.SERVER_URL}/model/?name=${term}`).pipe(
      catchError(this.handleError<any[]>('searchModels', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addUser(user: User): Observable<any> {
    return this.http.post<any>(`${this.SERVER_URL}/user/create`, user, this.httpOptions).pipe(
      catchError(this.handleError<any>('addModel'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteUser(id: number): Observable<any> {
    const url = `${this.SERVER_URL}/user/delete/${id}`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteModel'))
    );
  }

  /** PUT: update the hero on the server */
  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.SERVER_URL}/user/${id}`, user, this.httpOptions).pipe(
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
