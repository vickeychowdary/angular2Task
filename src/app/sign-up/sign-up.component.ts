import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('users')) {
      this.users = localStorage.getItem('users');
    }
  }
  users: any = [];
  isUserRegistered = false;
  storeUsers(userForm) {
    var user = userForm.value;
    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'));
    }
    var result = this.users.filter(function (v, i) {
      return ((v["email"] == user.email || v["userName"] == user.userName) || v["mobile"] == user.mobile);
    });
    if(result.length>0){
      this.toastr.error('User already registered');
      return;
    }
    this.users.push(user);
    this.users = JSON.stringify(this.users);
    localStorage.setItem("users", this.users);
    this.toastr.success("User registered successfully");
    userForm.reset();
    this.isUserRegistered = true;
  }

}
