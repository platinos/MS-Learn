import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { PopoverPage } from '../titlemenu/titlemenu';



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
  listingPerformance: [{}];
  responsePerformance: any = {
    "status": null,
    "error": null,
    "response": []
  };
  testsPage: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private ms: MessageServiceProvider) {
  }

  getTestDetails(tid:any){

    this.navCtrl.push('TestdetailsPage',{test_id : tid});

  }

  ionViewDidLoad() {
    this.testsPage ="Upcoming"; // for selecting to 

    this.ms.getData("tests/time/upcoming").subscribe(data => {
      this.responseUpTests=data;
      this.listingUpTests=this.responseUpTests.response;
  });

  this.ms.getData("tests/time/past").subscribe(data => {
    this.responseHisTests=data;
    this.listingHisTests=this.responseHisTests.response;
});
    this.ms.getData("performance/1").subscribe(data => {
    this.responsePerformance=data;
    this.listingPerformance=this.responsePerformance.response;
});


  }
  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
  doRefresh(refresher){
    setTimeout(() => {
      this.ionViewDidLoad();
      refresher.complete();
    }, 2000);

}


}
