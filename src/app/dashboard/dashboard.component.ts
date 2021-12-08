import * as moment from 'moment';

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ModelService } from '../services/model/model.service';
import { EventsService } from '../services/event/events.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  models: any[] = [];
  events: any[] = [];
  curDateTemp: any = 'Декабрь';
  daysInMonth: any;
  days: any[] = [];
  month: any;

  constructor(
      private modelService: ModelService,
      private eventsService: EventsService,
    ) { }

  ngOnInit(): void {
    this.getModels();
    this.getEvents();
    this.month = moment().month();
    this.month++;

    this.daysInMonth = moment().daysInMonth();
    
    for (let i = 1; i <= this.daysInMonth; i++) {
      this.days.push(
        { day: i, events: [] }
      ); 
    }
  }

  getModels(): void {
    this.modelService.getModels()
        .subscribe(models => this.models = models);
  }

  getEvents(): void {
    this.eventsService.getEvents().subscribe(events => {
      this.events = events.filter((event) => {
        return +this.month === +event.month;
      });

      for (let i = 0; i < this.days.length; i++) {
        for (let j = 0; j < this.events.length; j++) {
          if (+this.days[i].day === +this.events[j].day) this.days[i].events.push(this.events[j]);
        }
      }

      console.log(this.days);
    });
  }
}
