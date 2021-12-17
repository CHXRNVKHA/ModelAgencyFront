import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Model } from '../interfaces/model';
import { ModelService } from '../services/model/model.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  displayedColumns: string[] = ['idModel', 'name', 'lastName', 'email'];
  dataSource: MatTableDataSource<Model>;
  models: Model[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public deleteForm = this.fb.group({
    modelId: ['', Validators.maxLength(50)],
  });

  constructor(private modelService: ModelService, private fb: FormBuilder) {
   
  }

  ngOnInit(): void {

    this.modelService.getModels().subscribe((models) => {
      this.models = models;
      this.dataSource = new MatTableDataSource(models);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  public deleteModel(): void {
    const id = this.deleteForm.value.modelId;
    if (id != '') {
      this.modelService.deleteModel(id).subscribe(() => {
        this.models = this.models.filter((item) => {
          return item.idModel != id;
        });

        this.dataSource = new MatTableDataSource(this.models);
      })
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
