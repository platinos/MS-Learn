import { Component } from '@angular/core';

import { App, NavController, ModalController, ViewController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';


@Component({
    template: `
    <ion-list>
      <button ion-item (click)="close('http://platinos.in/')">Help</button>
      <button ion-item (click)="close('http://platinos.in/')">About Us</button>
      <button ion-item (click)="logout()">Logout</button>
    </ion-list>
  `
})
export class PopoverPage {

    constructor(
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public app: App,
        public modalCtrl: ModalController,
        public userData: UserData
    ) { }

    logout() {
        //this.app.getRootNav().push('SupportPage');
        this.userData.logout();
        this.viewCtrl.dismiss();
    }

    close(url: string) {
        window.open(url, '_blank');
        this.viewCtrl.dismiss();
    }
}