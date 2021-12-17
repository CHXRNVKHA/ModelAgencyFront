import { Component, OnInit } from '@angular/core';
import { Model } from '../interfaces/model';
import { ModelService } from '../services/model/model.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-model-create',
  templateUrl: './model-create.component.html',
  styleUrls: ['./model-create.component.scss']
})
export class ModelCreateComponent implements OnInit {
  model: any;
  constructor(
    public fb: FormBuilder,
    private modelService: ModelService,
  ) { }

  public modelForm = this.fb.group({
    name: ['', Validators.maxLength(50)],
    lastName: ['', Validators.maxLength(100)],
    country: ['', Validators.maxLength(50)],
    email: [''],
    age: ['', Validators.maxLength(150)],
    adress: ['', Validators.maxLength(50)],
    gender: ['', Validators.maxLength(20)],
    birthday: [''],
    growth: ['', Validators.maxLength(50)],
    bust: ['', Validators.maxLength(100)],
    waist: ['', Validators.maxLength(50)],
    weight: [''],
    appearance: ['', Validators.maxLength(150)],
    eye_color: ['', Validators.maxLength(50)],
    hair_color: ['', Validators.maxLength(20)],
    hair_type: [''],
  });

  public modelFormInfo = this.fb.group({
    name: ['', Validators.maxLength(50)],
    lastName: ['', Validators.maxLength(100)],
    country: ['', Validators.maxLength(50)],
    email: [''],
    age: ['', Validators.maxLength(150)],
    address: ['', Validators.maxLength(50)],
    gender: ['', Validators.maxLength(20)],
    birthday: [''],
  });

  public modelFormParams = this.fb.group({
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

  ngOnInit(): void {
  }

  public saveModel(): void {   
    this.modelService.addModel({
      name: this.modelFormInfo.value.name,
      lastName: this.modelFormInfo.value.lastName,
      country: this.modelFormInfo.value.country,
      email: this.modelFormInfo.value.email,
      age: this.modelFormInfo.value.age,
      address: this.modelFormInfo.value.address,
      gender: this.modelFormInfo.value.gender,
      birthday: this.modelFormInfo.value.birthday,
      growth: this.modelFormInfo.value.growth,
      bust: this.modelFormInfo.value.bust,
      waist: this.modelFormInfo.value.waist,
      footSize: this.modelFormInfo.value.footSize,
      weight: this.modelFormInfo.value.weight,
      appearance: this.modelFormInfo.value.appearance,
      eyeColor: this.modelFormInfo.value.eyeColor,
      hairColor: this.modelFormInfo.value.hairColor,
      hairType: this.modelFormInfo.value.hairType,
    } as Model).subscribe(() => {
      window.location.href = '/dashboard';
    });
  }
}
