import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';


@IonicPage()
@Component({
  selector: 'page-talk',
  templateUrl: 'talk.html',
})
export class TalkPage {


  responseTalks: any = {
    "status": null,
    "error": null,
    "response": []
  };
  listingTalks: [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private ms: MessageServiceProvider) {
  }

  ionViewDidLoad() {
    this.ms.getData("conversations/2").subscribe(data => {
      this.responseTalks=data;
      this.listingTalks=this.responseTalks.response;
  });
}

}
