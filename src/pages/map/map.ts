import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform, NavController } from 'ionic-angular';

import { MessageServiceProvider } from '../../providers/message-service/message-service';




@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  response: any = {
    "status": null,
    "error": null,
    "response": []
  };
  listing: [{}];
  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public navCtrl: NavController, public confData: ConferenceData, public platform: Platform, private ms: MessageServiceProvider) {
    this.getMessage();
    
  }
  getMessage() {
    this.ms.getSubjects().subscribe(data => {
      this.response = data;
      this.listing = this.response.response;
    });

  }
 

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getMessage();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

 shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
  goToOtherPage(pageid,subject) {
    this.navCtrl.push(pageid, {subject: subject});
  }
 
}
