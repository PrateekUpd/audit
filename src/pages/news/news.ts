import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
const API_URL = 'https://newsapi.org/v2';
const API_KEY = '9756bb93a9ed4572b0d97dd7b9369a48';
/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'newspage'
})
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
  }
  getData(url) {
    return this.http.get(`${API_URL}/${url}&apiKey=${API_KEY}`);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
    this.getData('top-headlines?country=us&category=business').subscribe(data => {
      console.log(data);
    })
  }
   url = 'top-headlines?country=us&category=business';

}

