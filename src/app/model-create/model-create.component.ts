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
    adress: ['', Validators.maxLength(50)],
    gender: ['', Validators.maxLength(20)],
    birthday: [''],
  });

  public modelFormParams = this.fb.group({
    growth: ['', Validators.maxLength(50)],
    bust: ['', Validators.maxLength(100)],
    waist: ['', Validators.maxLength(50)],
    weight: [''],
    appearance: ['', Validators.maxLength(150)],
    eye_color: ['', Validators.maxLength(50)],
    hair_color: ['', Validators.maxLength(20)],
    hair_type: [''],
  });

  ngOnInit(): void {
  }

  public saveModel(): void {
    this.modelService.getModels().subscribe(
      (models) => {
        this.model = models.pop();
        this.model.id += 1;
        this.model.name= this.modelForm.value.name;
        this.model.lastName= this.modelForm.value.lastName;
        this.model.country= this.modelForm.value.country;
        this.model.email= this.modelForm.value.email;
        this.model.age= this.modelForm.value.age;
        this.model.adress= this.modelForm.value.adress;
        this.model.gender= this.modelForm.value.gender;
        this.model.birthday= this.modelForm.value.birthday;
        this.model.growth= this.modelForm.value.growth;
        this.model.bust= this.modelForm.value.bust;
        this.model.waist= this.modelForm.value.waist;
        this.model.weight= this.modelForm.value.weight;
        this.model.appearance= this.modelForm.value.appearance;
        this.model.eye_color= this.modelForm.value.eye_color;
        this.model.hair_color= this.modelForm.value.hair_color;
        this.model.hair_type= this.modelForm.value.hair_type;
        console.log('id', this.model);
        this.modelService.addModel(this.model)
      .subscribe((model) => {
        console.log(model);
        this.modelService.getModels().subscribe((models) => {console.log(models)})
      });
      }
    );
   
    
  }
}
