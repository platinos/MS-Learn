import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
//import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';
  quesImg = 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg';
  quesText = 'Loading...';
  chapter = '';
  title = '';
  id : number;
  selectedProduct: any;


  constructor(private barcodeScanner: BarcodeScanner, private toast: Toast, public popoverCtrl: PopoverController, private ms: MessageServiceProvider) {
    this.getMessage(1804);
   }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }

  getMessage(qid){
    this.ms.getMessage(qid).subscribe(data => this.showData(data));
  
  }
  showData(data){
    this.chapter = data.data[0].chapter;
    this.quesImg = "http://msmypaper.com/mypaper/role_admin/"+data.data[0].ques_img;
    this.quesText = data.data[0].ques_txt;
    this.title = "Q. " + data.data[0].id + " (" + data.data[0].subject+")" ;
    this.id = data.data[0].id;
    this.sanitizeImage();
    //this.youtube.openVideo('dZ0fwJojhrs');

  }

  swipeEvent(e) {
    if (e.offsetDirection == 2)
    this.id = Number(this.id) + 1;
    else 
      this.id = Number(this.id) - 1;
    //alert(this.id);
    this.getMessage(this.id);
    console.log(e);

  }

  sanitizeImage(){

    //console.log("i m here");

    var getDivId = document.getElementsByClassName("questxt");
    var images = getDivId[0].getElementsByTagName("img");
    for (var i = 0; i < images.length; i++) {
      var imgsrcstr = images[i].src;
      //imgsrcstr = imgsrcstr.substring(imgsrcstr.indexOf(":") + 1);
      imgsrcstr = imgsrcstr.substring(imgsrcstr.indexOf(":") + 1);
      imgsrcstr = "http://msmypaper.com/mypaper/role_admin/u" + imgsrcstr;
      images[i].src = imgsrcstr;
      console.log(imgsrcstr);

      //alert(images[i].src);
    }
  }

  scan() {
    this.selectedProduct = {};
    try {
      this.barcodeScanner.scan().then((barcodeData) => {
        console.log(barcodeData.text);

        var btxt = barcodeData.text;
        btxt = btxt.substring(btxt.lastIndexOf("0") + 1);
        this.toast.show(btxt, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
        this.getMessage(Number(btxt));

      }, (err) => {
        try {
          this.toast.show(err, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        } catch (error) {
          console.log(error);
          
        }
        
      });
    } catch (error) {
      console.error(error);
      
    }
    
  }

}
