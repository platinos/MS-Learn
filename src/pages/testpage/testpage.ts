import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TestsPage } from '../tests/tests';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the TestpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-testpage',
  templateUrl: 'testpage.html',
})
export class TestpagePage {
  tabBarElement: any;
  currentPaper: any;
  currentQuestion: any;
  qid = 1;
  showNext = true;
  showPrev = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController, public alertCtrl: AlertController, public sanitizer: DomSanitizer) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
  
    this.currentPaper = this.navParams.data.question_paper;
    this.currentQuestion = this.currentPaper.questions[0];
    this.maxTime = (this.currentPaper.questionPaperDetails.time)*60;
    this.StartTimer();
  
  }
  ionViewWillEnter() {
    this.menu.enable(false, 'loggedInMenu');
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  takeMeBack() {
    this.menu.enable(true, 'loggedInMenu');
    this.navCtrl.setRoot(TestsPage);
  }


  nextQuestion(qid){
    if (qid < this.currentPaper.questions.length)
    {
      this.currentQuestion = this.currentPaper.questions[qid];
      this.qid = qid+1;
    }
    this.showNav();
    
  }
  prevQuestion(qid){
      this.qid = qid - 1;
      this.currentQuestion = this.currentPaper.questions[this.qid-1];
     this.showNav();

  }
  showNav(){
    if (this.qid >= 1 && this.qid < this.currentPaper.questions.length){
      this.showNext = true;
    }
    else{
      this.showNext = false;
    }

    if (this.qid > 1 && this.qid <= this.currentPaper.questions.length) {
      this.showPrev = true;
    }
    else{
      this.showPrev = false;
    }
    
    
  }

  //Timer
  maxTime: any = 10
  timer:any;
  hidevalue= false;
  hours:any;
  minutes:any;
  seconds:any;

  StartTimer() {
    this.timer = setTimeout( ()=>{
      if (this.maxTime <= 0) {}
      this.maxTime -= 1;

      if (this.maxTime > 0) {
        this.hours = Math.floor(this.maxTime / 60)
        this.minutes = (this.maxTime%60)
        this.hidevalue = false;
        this.StartTimer();
      }

      else {
        this.hidevalue = true;
        this.timesUp();
      }

    }, 1000);


  }

  timesUp(){
    let alert = this.alertCtrl.create({
      title: 'Times Up!',
      subTitle: 'Thank you for taking the test. You shall be notified of the result soon.',
      buttons: ['OK']
    });
    alert.present();
    this.takeMeBack();
  }
}
