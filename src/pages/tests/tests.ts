import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

/**
 * Generated class for the TestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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

  constructor(public navCtrl: NavController, public navParams: NavParams,private ms: MessageServiceProvider) {
  }

  ionViewDidLoad() {
    this.ms.getData("tests/upcoming/2").subscribe(data => {
      this.responseUpTests=data;
      this.listingUpTests=this.responseUpTests.response;
  });
  }

}
