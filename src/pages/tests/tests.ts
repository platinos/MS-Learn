import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';



@IonicPage()
@Component({
  selector: 'page-tests',
  templateUrl: 'tests.html',
})
export class TestsPage {

  responseUpTests: any = {
    "status": null,
    "error": null,
    "response": []
  };
  listingUpTests: [{}];

  responseHisTests: any = {
    "status": null,
    "error": null,
    "response": []
  };
  listingHisTests: [{}];
  testsPage: String;

  constructor(public navCtrl: NavController, public navParams: NavParams,private ms: MessageServiceProvider) {
  }

  getTestDetails(tid:any){

    this.navCtrl.push('TestdetailsPage',{test_id : tid});

  }

  ionViewDidLoad() {
    this.testsPage ="Upcoming"; // for selecting to 

    this.ms.getData("tests/upcoming/2").subscribe(data => {
      this.responseUpTests=data;
      this.listingUpTests=this.responseUpTests.response;
  });

  this.ms.getData("tests/history/2").subscribe(data => {
    this.responseHisTests=data;
    this.listingHisTests=this.responseHisTests.response;
});


  }

}
