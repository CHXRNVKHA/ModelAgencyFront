import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Model } from '../interfaces/model';
import { ModelService } from '../services/model/model.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit {
  model: Model;
  isInfoEditMode: boolean = false;
  isParamEditMode: boolean = false;
  photo: any = 'Фото';
  event: any = 'Список событий';
  info: any = 'Информация';
  params: any = 'Параметры';

  public editInfoForm = this.fb.group({
    name: ['', Validators.maxLength(50)],
    lastName: ['', Validators.maxLength(100)],
    country: ['', Validators.maxLength(50)],
    email: [''],
    age: ['', Validators.maxLength(150)],
    adress: ['', Validators.maxLength(50)],
    gender: ['', Validators.maxLength(20)],
    birthday: [''],
  });

  public editParamForm = this.fb.group({
    growth: ['', Validators.maxLength(50)],
    bust: ['', Validators.maxLength(100)],
    waist: ['', Validators.maxLength(50)],
    weight: [''],
    appearance: ['', Validators.maxLength(150)],
    eye_color: ['', Validators.maxLength(50)],
    hair_color: ['', Validators.maxLength(20)],
    hair_type: [''],
  });

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private modelService: ModelService,
  ) { }

  ngOnInit(): void {
    this.getModel();
  }

  getModel(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.modelService.getModel(id)
      .subscribe(model => this.model = model);
  }

  public saveModelParam(): void {
    this.model.growth = this.editParamForm.value.growth,
    this.model.bust= this.editParamForm.value.bust,
    this.model.waist= this.editParamForm.value.waist,
    this.model.weight= this.editParamForm.value.weight,
    this.model.appearance= this.editParamForm.value.appearance,
    this.model.eye_color= this.editParamForm.value.eye_color,
    this.model.hair_color= this.editParamForm.value.hair_color,
    this.model.hair_type= this.editParamForm.value.hair_type,
    this.modelService.updateModel(this.model).subscribe(() => {
      this.isParamEditMode = false;
    });
  }

  public saveModelInfo(): void {
    this.model.name = this.editInfoForm.value.name,
    this.model.lastName= this.editInfoForm.value.lastName,
    this.model.country= this.editInfoForm.value.country,
    this.model.email= this.editInfoForm.value.email,
    this.model.age= this.editInfoForm.value.age,
    this.model.adress= this.editInfoForm.value.adress,
    this.model.gender= this.editInfoForm.value.gender,
    this.model.birthday= this.editInfoForm.value.birthday,
    this.modelService.updateModel(this.model).subscribe(() => {
      this.isInfoEditMode = false;
    });
  }

  public switchInfoMode(): void {
    this.fillInfoFields();
    this.isInfoEditMode = !this.isInfoEditMode;
  }

  public switchParamMode(): void {
    this.fillParamFields();
    this.isParamEditMode = !this.isParamEditMode;
  }

  public fillParamFields(): void {
    this.editParamForm.patchValue({
      growth: this.model.growth,
      bust: this.model.bust,
      waist: this.model.waist,
      weight: this.model.weight,
      appearance: this.model.appearance,
      eye_color: this.model.eye_color,
      hair_color: this.model.hair_color,
      hair_type: this.model.hair_type,
    });
  }

  public fillInfoFields(): void {
    this.editInfoForm.patchValue({
      name: this.model.name,
      lastName: this.model.lastName,
      country: this.model.country,
      email: this.model.email,
      age: this.model.age,
      adress: this.model.adress,
      gender: this.model.gender,
      birthday: this.model.birthday,
    });
  }

  public cancelInfoModelUpdate(): void {
    this.isInfoEditMode = false;
  }

  public cancelParamModelUpdate(): void {
    this.isParamEditMode = false;
  }

}
