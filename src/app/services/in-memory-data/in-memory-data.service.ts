/**import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {
  createDb() {
    const models = [
      { 
        id: 11, name: 'Lise', lastName: 'Annes', country: 'Germany', email: 'lisses@gmail.com', age: '20', adress: '2057 Aspen Court, Boston',
        gender: 'Female', birthday: '21.06.1998', growth: '175.5', bust: '80', waist: '61', foot_size: '40 EU / 9 US / 7 UK',
        weight: '69', appearance: 'European', eye_color: 'Blue', hair_color: 'Light Brown', hair_type: 'Straight',
      },

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
      { id: 11, description: 'event 1', day: '5', month: '12', year:'2021', startTimeHours: '7', startTimeMinutes: '7', endTimeHours: '18', endTimeMinutes: '18', model: '' },
      { id: 12, description: 'event 2', day: '5', month: '12', year:'2021', startTimeHours: '8', startTimeMinutes: '7', endTimeHours: '13', endTimeMinutes: '18', model: '' },
      { id: 13, description: 'event 3', day: '20', month: '12', year:'2021', startTimeHours: '19', startTimeMinutes: '7', endTimeHours: '20', endTimeMinutes: '18', model: ''  },
      { id: 14, description: 'event 4', day: '21', month: '12', year:'2021', startTimeHours: '10', startTimeMinutes: '7', endTimeHours: '14', endTimeMinutes: '18', model: ''  },
      { id: 15, description: '', day: '', month: '', year:'', startTimeHours: '', startTimeMinutes: '', endTimeHours: '', endTimeMinutes: '', model: '' },
      { id: 16, description: '', day: '', month: '', year:'', startTimeHours: '', startTimeMinutes: '', endTimeHours: '', endTimeMinutes: '', model: '' },
      { id: 17, description: '', day: '', month: '', year:'', startTimeHours: '', startTimeMinutes: '', endTimeHours: '', endTimeMinutes: '', model: '' },
      { id: 18, description: '', day: '', month: '', year:'', startTimeHours: '', startTimeMinutes: '', endTimeHours: '', endTimeMinutes: '', model: '' },
      { id: 19, description: '', day: '', month: '', year:'', startTimeHours: '', startTimeMinutes: '', endTimeHours: '', endTimeMinutes: '', model: '' },
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
*/