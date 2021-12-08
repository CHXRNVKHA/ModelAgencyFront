import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private eventsUrl = 'api/events';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    ) { }

  /** GET heroes from the server */
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.eventsUrl)
      .pipe(
        catchError(this.handleError<any[]>('getEvents', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getEventNo404<Data>(id: number): Observable<any> {
    const url = `${this.eventsUrl}/?id=${id}`;
    return this.http.get<any[]>(url)
      .pipe(
        map(events => events[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<any>(`getEvent id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getEvent(id: number): Observable<any> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError<any>(`getEvents id=${id}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchEvents(term: string): Observable<any[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.eventsUrl}/?name=${term}`).pipe(
      catchError(this.handleError<any[]>('searchEvents', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addEvents(event: any): Observable<any> {
    return this.http.post<any>(this.eventsUrl, event, this.httpOptions).pipe(
      catchError(this.handleError<any>('addEvents'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteEvents(id: number): Observable<any> {
    const url = `${this.eventsUrl}/${id}`;

    return this.http.delete<any>(url, this.httpOptions).pipe(
      catchError(this.handleError<any>('deleteEvents'))
    );
  }

  /** PUT: update the hero on the server */
  updateEvents(event: any): Observable<any> {
    return this.http.put(this.eventsUrl, event, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateEvents'))
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
