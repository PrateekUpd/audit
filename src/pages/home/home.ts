import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  formgroup: FormGroup;
  password: AbstractControl;
  email: AbstractControl;
  emailng: any;
  passwordng: any;

  items = [];
  constructor(public navCtrl: NavController,
    public formbuilder: FormBuilder,
    private http: Http) {
      this.formgroup = formbuilder.group({
    
        password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('[a-zA-Z0-9]*')])],
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[A-Z0-9a-z\\._%+-]+@([A-Za-z0-9-]+\\.)+[A-Za-z]{2,4}$')])],
  
      });
    
      this.password = this.formgroup.controls['password'];
      this.email = this.formgroup.controls['email'];
  }

  signin(){
    let body = {
      emailng: this.emailng,
      passwordng: this.passwordng,
    }
    this.http.post('http://localhost:3000/login', body).subscribe(response => {
      this.items = response.json();
      console.log(response.json());
      if(response.json().status == 200) {
        alert('Successfully logged in')
        this.navCtrl.push("newspage");
      }
      else{
        alert('Failed to login')
      }
    })
    //this.navCtrl.push(DispdataPage,{emailng:this.emailng,passwordng:this.passwordng})
  }
  register(){
    this.navCtrl.push("registerpage");
  }
}
