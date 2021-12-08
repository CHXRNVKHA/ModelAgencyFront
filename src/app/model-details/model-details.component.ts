import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit {
  photo: any = 'Фото';
  event: any = 'Список событий';
  info: any = 'Информация';
  params: any = 'Параметры';

  constructor() { }

  ngOnInit(): void {
  }

}
