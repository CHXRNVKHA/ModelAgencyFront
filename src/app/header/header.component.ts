import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User;
  public showAdminLink: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    const id = Number(localStorage.getItem('id')); 
    this.userService.getUser(id).subscribe((user) => {
      this.user = user;
      if (this.user.role === 'Super Admin') {
        this.showAdminLink = true;
      }
    });
    
  }

  public logout(): void {
    localStorage.removeItem('id');
    location.href = '/login';
  }

}
