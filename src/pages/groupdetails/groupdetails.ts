import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

/**
 * Generated class for the GroupdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-groupdetails',
  templateUrl: 'groupdetails.html',
})
export class GroupdetailsPage {

  responseGroup: any = {
    "status": null,
    "error": null,
    "response": []
  };
  listingGroup: [{}];

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private ms: MessageServiceProvider) {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad GroupdetailsPage');
    var gid = this.navParams.data.group_id;
    this.ms.getData("groups/"+gid+"/users").subscribe(data => {
      this.responseGroup = data;
      this.listingGroup = this.responseGroup.response;
    });
    


  }

}
