import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ModalController} from 'ionic-angular';
import { StatsPage } from '../stats/stats';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { PopoverPage } from '../titlemenu/titlemenu';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  profilePage:any;
  responseAccount: any = {
    "status": null,
    "error": null,
    "response": []
  };
  listingAccount: [{}];

  responseGroups: any = {
    "status": null,
    "error": null,
    "response": []
  };
  listingGroups: [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams, public popoverCtrl: PopoverController, public modalCtrl: ModalController, private ms: MessageServiceProvider) {
  }

  presentStatsModal() {
    let statsModal = this.modalCtrl.create(StatsPage);
    statsModal.present();
  }

  ionViewDidLoad() {
    this.profilePage ='Account';
    this.ms.getData('groups/my/2').subscribe(data => {
      this.responseGroups = data;
      this.listingGroups = this.responseGroups.response;
    });; //change uid after login
  }
  getGroupDetails(gid: any) {
    this.navCtrl.push('GroupdetailsPage', { group_id: gid });
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
}
