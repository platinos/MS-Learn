import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';

import { MessageServiceProvider } from '../../providers/message-service/message-service';




@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  cards: { "chName": string }[] = [];
  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform, private ms: MessageServiceProvider) {
    this.getMessage();
    
  }
  getMessage() {
    this.ms.getAllQuestions().subscribe(data => this.showData(data));

  }
  showData(data) {
    this.cards = [];
    console.log(data.data.size);
    for (let element in data.data) {
       if(element === 'size') break;
      var name = data.data[element].name;
      console.log(name);
      
      this.cards.push({"chName": name});
      }
      //this.cards = this.shuffle(this.cards);
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
 
}
