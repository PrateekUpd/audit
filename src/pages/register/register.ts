import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from "@angular/forms";
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'registerpage'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  formgroup: FormGroup;
  password: AbstractControl;
  email: AbstractControl;
  emailng: any;
  passwordng: any;

  items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public formbuilder: FormBuilder,
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
    this.http.post('http://localhost:3000/user', body).subscribe(response => {
      this.items = response.json();
      console.log(response.json());
      if(response.json().status == 200) {
        alert('Successfully submitted')
      }
      else{
        alert('Failed to submit')
      }
    })
    //this.navCtrl.push(DispdataPage,{emailng:this.emailng,passwordng:this.passwordng})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
