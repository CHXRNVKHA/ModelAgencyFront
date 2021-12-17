import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isExist: boolean = false;
  users: User[];

  public loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required, Validators.maxLength(150)]],
    pass: ['', [Validators.maxLength(10)]],
  });

  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.isExist = false;
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
  }

  public login(): void {
    const email: string = this.loginForm.value.email;
    const pass: string = this.loginForm.value.pass;
    const user = this.users.find((item) => {
      return item.email === email && item.password === pass;
    });
    if (user) {
      this.isExist = false;
      window.localStorage.setItem('id', `${user.idUser}`)
      location.href = '/dashboard';
    } else {
      this.isExist = true;
    }
  }

}
