import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { TestingapidetailsPage } from '../testingapidetails/testingapidetails';

/**
 * Generated class for the TestingapiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testingapi',
  templateUrl: 'testingapi.html',
})
export class TestingapiPage {

  response : any = {
    "status": null,
    "error": null,
    "response": []
  };
  listing : [{}];
  constructor(public navCtrl: NavController, public navParams: NavParams, private ms: MessageServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestingapiPage');
    this.getMessage();

  }
  getMessage() {
    this.ms.getQuestionPaper().subscribe(data => {
      
      this.response = data;
      //console.log(this.response.response);
      this.listing = this.response.response;
      console.log("----------------------------");
      
      console.log(this.listing);
      
      
    });

  }
  goToChapterDetail(chap_id: any) {
    this.navCtrl.push(TestingapidetailsPage, { ch_id: chap_id });
  }

}
