import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Model } from '../interfaces/model';
import { ModelService } from '../services/model/model.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-model-details',
  templateUrl: './model-details.component.html',
  styleUrls: ['./model-details.component.scss']
})
export class ModelDetailsComponent implements OnInit, OnDestroy {
  model: Model;
  isInfoEditMode: boolean = false;
  isParamEditMode: boolean = false;
  photo: any = 'Фото';
  event: any = 'Список событий';
  info: any = 'Информация';
  params: any = 'Параметры';

  public notesForm = this.fb.group({
    notes: [''],
  });

  public editInfoForm = this.fb.group({
    name: ['', Validators.maxLength(50)],
    lastName: ['', Validators.maxLength(100)],
    country: ['', Validators.maxLength(50)],
    email: [''],
    age: ['', Validators.maxLength(150)],
    address: ['', Validators.maxLength(50)],
    gender: ['', Validators.maxLength(20)],
    birthday: [''],
  });

  public editParamForm = this.fb.group({
    growth: ['', Validators.maxLength(50)],
    bust: ['', Validators.maxLength(100)],
    waist: ['', Validators.maxLength(50)],
    footSize: [''],
    weight: [''],
    appearance: ['', Validators.maxLength(150)],
    eyeColor: ['', Validators.maxLength(50)],
    hairColor: ['', Validators.maxLength(20)],
    hairType: [''],
  });

  constructor(
    public fb: FormBuilder,
    private route: ActivatedRoute,
    private modelService: ModelService,
  ) { }

  ngOnInit(): void {
    this.getModel();
  }

  ngOnDestroy(): void {
    this.model.notes = this.notesForm.value.notes;
    console.log('41254', this.notesForm.value.notes);
    this.modelService.updateModel(this.model.idModel, this.model).subscribe(() => {
    });
  }

  getModel(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.modelService.getModel(id)
      .subscribe(model => {
        this.model = model; 
        console.log(model)
        this.notesForm.patchValue({
          notes: this.model.notes,
        });
      });
  }

  public saveModelParam(): void {
    this.model.growth = this.editParamForm.value.growth,
    this.model.bust= this.editParamForm.value.bust,
    this.model.waist= this.editParamForm.value.waist,
    this.model.footSize= this.editParamForm.value.footSize,
    this.model.weight= this.editParamForm.value.weight,
    this.model.appearance= this.editParamForm.value.appearance,
    this.model.eyeColor= this.editParamForm.value.eyeColor,
    this.model.hairColor= this.editParamForm.value.hairColor,
    this.model.hairType= this.editParamForm.value.hairType,
    this.modelService.updateModel(this.model.idModel, this.model).subscribe(() => {
      this.isParamEditMode = false;
    });
  }

  public saveModelInfo(): void {
    this.model.name = this.editInfoForm.value.name,
    this.model.lastName= this.editInfoForm.value.lastName,
    this.model.country= this.editInfoForm.value.country,
    this.model.email= this.editInfoForm.value.email,
    this.model.age= this.editInfoForm.value.age,
    this.model.address= this.editInfoForm.value.address,
    this.model.gender= this.editInfoForm.value.gender,
    this.model.birthday= this.editInfoForm.value.birthday,
    this.modelService.updateModel(this.model.idModel, this.model).subscribe(() => {
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
      footSize: this.model.footSize,
      weight: this.model.weight,
      appearance: this.model.appearance,
      eyeColor: this.model.eyeColor,
      hairColor: this.model.hairColor,
      hairType: this.model.hairType,
    });
  }

  public fillInfoFields(): void {
    this.editInfoForm.patchValue({
      name: this.model.name,
      lastName: this.model.lastName,
      country: this.model.country,
      email: this.model.email,
      age: this.model.age,
      address: this.model.address,
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
