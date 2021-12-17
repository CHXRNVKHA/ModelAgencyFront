import * as moment from 'moment';

import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';

import { ModelService } from '../services/model/model.service';
import { EventsService } from '../services/event/events.service';
import { Model } from '../interfaces/model';
import { Observable, Subject } from 'rxjs';
import { mdiArrowRight } from '@mdi/js';
import { ThrowStmt } from '@angular/compiler';
import { FormBuilder, Validators } from '@angular/forms';
import { Event } from '../interfaces/event';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  models: any[] = [];
  events: any[] = [];
  curDateTemp: moment.Moment;
  daysInMonth: any;
  days: any[] = [];
  month: any;
  monthTitle: string;
  yearTitle: string;

  eventUpdateId: number;
  eventToUpdate: Event;

  public addEventForm = this.fb.group({
    description: ['', Validators.maxLength(150)],
    date: ['', Validators.maxLength(10)],
    start: ['', Validators.maxLength(10)],
    end: [''],
  });

  constructor(
      public fb: FormBuilder,
      private modelService: ModelService,
      private eventsService: EventsService,
    ) { }

  ngOnInit(): void {
    this.getModels();
  }

  public addEvent(): void {
    this.eventsService.getEvent(this.eventUpdateId).subscribe(
      (event) => {
        this.eventToUpdate = event;
        this.eventToUpdate.description = this.addEventForm.value.description;
        this.eventToUpdate.day= '3';
        this.eventToUpdate.month= '12';
        this.eventToUpdate.year= '2021';
        this.eventToUpdate.startTimeHours= 'this.addEventForm.value.startTimeHours';
        this.eventToUpdate.startTimeMinutes= 'this.addEventForm.value.startTimeMinutes';
        this.eventToUpdate.endTimeHours= 'this.addEventForm.value.endTimeHours';
        this.eventToUpdate.endTimeMinutes= 'this.addEventForm.value.endTimeMinutes';
        this.eventsService.updateEvent(this.eventToUpdate).subscribe(event => {
          console.log(event);
          this.eventUpdateId++;
          this.days = [];
          this.initDays();
          this.getEvents();
        });
      }
    );
  }

  public initDays(): void {
    for (let i = 1; i <= this.daysInMonth; i++) {
      this.days.push(
        { day: i, events: [] }
      ); 
    }
  }

  getModels(): void {
    this.modelService.getModels()
        .subscribe((models) => {this.models = models; } );
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
    });
  }

  public monthBack(): void {
    this.curDateTemp = moment(this.curDateTemp).subtract(1, 'month');
    this.monthTitle = this.curDateTemp.format('MMMM');
    this.yearTitle = this.curDateTemp.format('YYYY');

 
    this.month = moment(this.curDateTemp).month()
    this.month++;
    this.days = [];
    this.daysInMonth = moment(this.curDateTemp).daysInMonth();
    this.initDays();
    this.getEvents();
  }

  public monthForward(): void {
    this.curDateTemp = moment(this.curDateTemp).add(1, 'month');
    this.monthTitle = this.curDateTemp.format('MMMM');
    this.yearTitle = this.curDateTemp.format('YYYY');

    this.month = moment(this.curDateTemp).month()
    this.month++;
    this.days = [];
    this.daysInMonth = moment(this.curDateTemp).daysInMonth();
    this.initDays();
    this.getEvents();
  }
}
