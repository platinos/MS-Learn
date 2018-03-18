import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageServiceProvider } from '../../providers/message-service/message-service';



@IonicPage()
@Component({
  selector: 'page-testingapidetails',
  templateUrl: 'testingapidetails.html',
})
export class TestingapidetailsPage {

  response: any = {
    "status": null,
    "error": null,
    "response": [{}]
  };
  qlist: any = [{}];
  qlistDet: any = [{}];
  constructor(public navCtrl: NavController, public navParams: NavParams, private ms: MessageServiceProvider) {
    
  }
  getMessage(ch_id) {
    this.ms.getQuestionPaperDetails(ch_id).subscribe(data => {
      //console.log(data);
      this.qlist = [];
      this.response = data;
      this.response.response.forEach(element => {
        console.log("~~~~~~~~~~~~~~~~~~~~");
        console.log(element);
        console.log("~~~~~~~~~~~~~~~~~~~~");
        
        this.ms.getquestionDetails(element.quesid).subscribe(data2 => { this.qlist.push(data2)});
      });
      console.log("###################");
      
       console.log(this.qlist);
       
      //this.qlistDet = this.qlist.response;
      //console.log("==============");
      //console.log(this.qlistDet);
      
      

    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TestingapidetailsPage');
      this.getMessage(this.navParams.data.ch_id);
  }

}
