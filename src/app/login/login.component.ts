import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private router: Router
    ) { }

  ngOnInit() {
    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'));
      console.log(this.users)
    }
  }
  users: any = [];
  login(loginDetails) {
    if (localStorage.getItem('users')) {
      this.users = JSON.parse(localStorage.getItem('users'));
      console.log(this.users)
    }
    var user = this.users.filter(function (v, i) {
      return ((v["email"] == loginDetails.loginId || v["userName"] == loginDetails.loginId) || v["mobile"] == loginDetails.loginId);
    })
    console.log(user);
    if(user.length == 1){
      if(user[0].password === loginDetails.password){
        var currentUser = JSON.stringify(user[0])
        localStorage.setItem('currentUser', currentUser);
        this.toastr.success('User login successful');
        this.router.navigate(['/userDetails'])
      }else{
        this.toastr.error('Invalid credentials')
      }
    }else{
      this.toastr.error('User not found');
      console.log('User not found')
    }
  }

}
