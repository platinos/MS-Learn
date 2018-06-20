import { Component } from '@angular/core';
import { IonicPage, /* NavController, NavParams */} from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { LoadingController } from 'ionic-angular';
import { PopoverPage } from '../titlemenu/titlemenu';
import { PopoverController } from 'ionic-angular';
//import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

/**
 * Generated class for the ScansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scans',
  templateUrl: 'scans.html',
})
export class ScansPage {
 
  quesImg = 'https://image.freepik.com/free-vector/wall-background-scanning-qr-code_23-2147591989.jpg';
  quesText = 'Loading...';
  chapter: string;
  title: string;
  id: number;
  selectedProduct: any;
  youtubeId: string;
  


  constructor(private barcodeScanner: BarcodeScanner, 
    private toast: Toast, 
    public popoverCtrl: PopoverController, 
    private ms: MessageServiceProvider, 
    public loadingCtrl: LoadingController,
    //private youtube: YoutubeVideoPlayer,
    private iab: InAppBrowser,
    private screenOrientation: ScreenOrientation) {
    //this.getMessage(1804);
  }

  getMessage(qid) {

    this.ms.getMessage(qid).subscribe(data => {
      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      this.showData(data);
      loader.dismiss();
    
    });
    

  }
  showData(data) {
    //console.log(data.data[0]);
    
    this.chapter = data.data[0].chapter;
    //this.quesImg = "http://msmypaper.com/mypaper/role_admin/" + data.data[0].ques_img;
    this.quesText = data.data[0].ques_txt;
    this.title = "Q. " + data.data[0].id + " (" + data.data[0].subject + ")";
    this.id = data.data[0].id;
    this.youtubeId = data.data[0].youtube;
    this.youtubeId = this.youtubeId.substring(this.youtubeId.lastIndexOf("v=") + 1, this.youtubeId.lastIndexOf("&"));
    this.youtubeId = this.youtubeId.substr(1);

  }

  swipeEvent(e) {
    if (e.offsetDirection == 2)
      this.id = Number(this.id) + 1;
    else
      this.id = Number(this.id) - 1;
    //alert(this.id);
    this.getMessage(this.id);
   // console.log(e);

  }

  sanitizeImage() {

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
      this.barcodeScanner.scan()
      .then((barcodeData) => {
        if (barcodeData.cancelled == true) {
          //alert("Was cancelled");
        }
        else{
          
          console.log(barcodeData.text);
          var btxt = barcodeData.text;
          btxt = btxt.substring(btxt.lastIndexOf("0") + 1);
          
          this.getMessage(Number(btxt));
        }
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

        })
      .catch(err => console.log("bleh"+err));
    } catch (error) {
      console.error(error);
    }

  }
  ionViewDidLoad() {
    
  }
  ionViewDidEnter(){
    this.scan();
    //this.getMessage('7114');
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
  playVideo(){
   // this.youtube.openVideo('c8jP5GIWlak');
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
   console.log(this.youtubeId);
    const browser = this.iab.create('http://platinos.in/video.php?v=' + this.youtubeId, '_blank', 'location=no,zoom=no,hardwareback=no,footer=yes');
    
    browser.on('exit').subscribe(
      () => {
        this.screenOrientation.unlock();

      }
    )
  }
  

}
