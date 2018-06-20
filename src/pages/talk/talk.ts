import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { PopoverPage } from '../titlemenu/titlemenu';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, private ms: MessageServiceProvider) {
  }

  ionViewDidLoad() {
    this.ms.getData("conversations/2").subscribe(data => {
      this.responseTalks=data;
      this.listingTalks=this.responseTalks.response;
  });
}
  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

}
