import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  models: string[] = ['Kristina Ermakova', 'Kristina Kramilova', 'Kristina Senkina', 'Gigi Hadid', 'Heidi Klum'];

  constructor() { }

  ngOnInit(): void {
  }

}
