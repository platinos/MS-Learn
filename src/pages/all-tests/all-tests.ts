import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { TestingapidetailsPage } from '../testingapidetails/testingapidetails';

/**
 * Generated class for the AllTestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-all-tests',
  templateUrl: 'all-tests.html',
})
export class AllTestsPage {

  response: any = {
    "status": null,
    "error": null,
    "response": []
  };
  listing: [{}];
  subject : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private ms: MessageServiceProvider) {
  }

  ionViewDidLoad() {
    this.subject = this.navParams.data.subject
    this.getMessage(this.subject);

  }
  getMessage(subject: any) {
    //this.listing.length = 0;
    this.ms.getQuestionPaperBySubject(subject).subscribe(data => {

      this.response = data;
      //console.log(this.response.response);
      this.listing = this.response.response;
      //console.log("----------------------------");

      //console.log(this.listing);


    });

  }
  goToChapterDetail(chap_id: any) {
    this.navCtrl.push(TestingapidetailsPage, { ch_id: chap_id });
  }
}
