import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { TestpagePage } from '../testpage/testpage';
import { MessageServiceProvider } from '../../providers/message-service/message-service';

/**
 * Generated class for the InstructionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-instructions',
  templateUrl: 'instructions.html',
})
export class InstructionsPage {
  tid: any;
  currentTestFile: any;
  
  @ViewChild(Nav) nav: Nav;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private ms: MessageServiceProvider) {
  }

  ionViewDidLoad() {
     this.tid = this.navParams.data.test_id;
     var file_url = this.navParams.data.test_file;
    this.ms.getFileData(file_url).subscribe(data => {
      //console.log(data);
      this.currentTestFile = data;
      console.log(this.currentTestFile);
      
    });



     
  }

  startTest(testId: string){

    //this.nav.setRoot(TestpagePage, { test_id: testId });
    this.navCtrl.setRoot(TestpagePage, { test_id: testId, question_paper: this.currentTestFile});
  }

}
