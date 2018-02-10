import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { TestingapidetailsPage } from '../testingapidetails/testingapidetails';

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
    //console.log(this.subject);
    if(this.subject != null)
      this.getQuestionPaperBySubject(this.subject);
    else
      this.getQuestionPapers();

  }
  getQuestionPaperBySubject(subject: any) {
    this.ms.getQuestionPaperBySubject(subject).subscribe(data => this.fillData(data));
  }
  getQuestionPapers(){
    this.ms.getQuestionPaper().subscribe(data => this.fillData(data));
  }
  goToChapterDetail(chap_id: any) {
    this.navCtrl.push(TestingapidetailsPage, { ch_id: chap_id });
  }
  fillData(data){
    this.response = data;
    this.listing = this.response.response;
  }
}
