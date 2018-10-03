import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { TestsPage } from '../tests/tests';
import { AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { MessageServiceProvider } from '../../providers/message-service/message-service';



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
  noOfQuestions = [];
  reviewQuestions = [];
  savedQuestion = [];
  savedReviewQuestion = [];
  //responseObj : {questionId: number, answer: number};
  studentResponse:any = [{}];

  finalAnswer= {
    "uid": 1, //Change this
    "testid": 0,
    "sturesponse": "",
    "score": 0,
    "total": 0
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public menu: MenuController, public alertCtrl: AlertController, public sanitizer: DomSanitizer, public ms: MessageServiceProvider) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewDidLoad() {
    this.currentPaper = this.navParams.data.question_paper;
    this.currentPaper = JSON.parse(this.imageSanitize(JSON.stringify(this.currentPaper)));
    this.noOfQuestions = this.currentPaper.questions;
    this.currentQuestion = this.currentPaper.questions[0];
    this.studentResponse.pop();
    this.currentPaper.questions.forEach((item, index) => {
      item = item;
      this.studentResponse.push({
        quesionId : index,
        answer: 0
      });
    });
    
    this.maxTime = (this.currentPaper.questionPaperDetails.time)*60;
    this.StartTimer();
    this.showNav();
    this.finalAnswer.testid = +this.navParams.data.test_id;
    this.finalAnswer.total = +this.currentPaper.questionPaperDetails.marks;
  
  }
  ionViewWillEnter() {
    this.menu.enable(false, 'loggedInMenu');
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  takeMeBack() {
    this.calcResult();
    console.log(this.finalAnswer);
    this.ms.postStudentResponse(this.finalAnswer).subscribe(data => {
      console.log(data);
      
      });

    
    this.menu.enable(true, 'loggedInMenu');
    this.navCtrl.setRoot(TestsPage);
  }
  submitTest(){
    this.timesUp('Response submitted for evaluation.');
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
  jumpToQuestion(qid){
    this.qid = qid+1;
    this.currentQuestion = this.currentPaper.questions[this.qid - 1];
    this.menu.close();
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
  
  calcResult(){
    this.finalAnswer.score = 10;
    this.finalAnswer.sturesponse = JSON.stringify(this.studentResponse);
    this.currentPaper.questions.forEach((item, index) => {
      item=item;
      index=index;
    });



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
        this.timesUp('Times Up!');
      }

    }, 1000);


  }

  timesUp(text){
    let alert = this.alertCtrl.create({
      title: text,
      subTitle: 'Thank you for taking the test. You shall be notified of the result soon.',
      buttons: ['OK']
    });
    alert.present();
    this.takeMeBack();
  }

  imageSanitize(str) {
    return (str.replace(/src=\\\"/gi, "src=\\\"http://msmypaper.com/mypaper/role_admin/"));
  }
  
  isReviewed(qid){
    if (this.reviewQuestions.indexOf(qid-1) > -1) return true;
    else return false;
  }

  isSavedReviewed(qid){
    if (this.savedReviewQuestion.indexOf(qid-1) > -1) return true;
    else return false;
  }

  isSaved(qid){
    if (this.savedQuestion.indexOf(qid-1) > -1) return true;
    else return false;
  }

  markForReview(qid) {

    var index = this.reviewQuestions.indexOf(qid-1);
    if(index !== -1) this.reviewQuestions.splice(index, 1);
    else
    this.reviewQuestions.push(qid-1);
    this.nextQuestion(qid);

    
  }

  markForSave(qid) {
    if(this.studentResponse[qid-1].answer == 0)
    {
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Please Select a Option',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else
    { 
    var index = this.savedQuestion.indexOf(qid-1);
    if(index !== -1) this.savedQuestion.splice(index, 1);
    else
    this.savedQuestion.push(qid-1);
    this.nextQuestion(qid);
    } 
    
  }
  markForSavedReview(qid) {

    if(this.studentResponse[qid-1].answer == 0)
    {
      let alert = this.alertCtrl.create({
        title: 'Warning',
        subTitle: 'Please Select a Option',
        buttons: ['Dismiss']
      });
      alert.present();
    }
    else
    {      
    var index = this.savedReviewQuestion.indexOf(qid-1);
    if(index !== -1) this.savedReviewQuestion.splice(index, 1);
    else
    this.savedReviewQuestion.push(qid-1);
    this.nextQuestion(qid);
    }

    
  }


  clearResponse(qid){
    this.studentResponse[qid-1].answer = 0;
  }
}
