import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const models = [
      { id: 11, name: 'Lise', lastName: 'Annes' },
      { id: 12, name: 'Ugbad', lastName: 'Ubdi' },
      { id: 13, name: 'Adriana', lastName: 'Lima' },
      { id: 14, name: 'Heidi', lastName: 'Klum' },
      { id: 15, name: 'Kendall', lastName: 'Jenner' },
      { id: 16, name: 'Kara', lastName: 'Delevingne' },
      { id: 17, name: 'Bar', lastName: 'Rafaeli' },
      { id: 18, name: 'Gigi', lastName: 'Hadid' },
      { id: 19, name: 'Marisa', lastName: 'Miller' },
      { id: 20, name: 'Kate', lastName: 'Upton' }
    ];

    const events = [
      { id: 11, description: 'event 1', day: '5', month: '12', startTime: '7', endTime: '18' },
      { id: 12, description: 'event 2', day: '5', month: '12', startTime: '8', endTime: '13' },
      { id: 13, description: 'event 3', day: '20', month: '12', startTime: '19', endTime: '20' },
      { id: 14, description: 'event 4', day: '21', month: '12', startTime: '10', endTime: '14' },
    ];
    return {models, events};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genModelId(models: any[]): number {
    return models.length > 0 ? Math.max(...models.map(model => model.id)) + 1 : 11;
  }

  genEventId(events: any[]): number {
    return events.length > 0 ? Math.max(...events.map(events => events.id)) + 1 : 11;
  }
}
