import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

/*
  Generated class for the MessageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessageServiceProvider {

  constructor(private http: HttpClient) {
    //console.log('Hello MessageServiceProvider Provider');
  }

  getData(endpoint:string){

    return this.http.get('http://35.227.64.60:3000/api/v1/'+endpoint)
      .do(res => console.log(res));


  }
  getFileData(endpoint: string) {
    return this.http.get(endpoint);
  }
  postStudentResponse(sturesponse: any){
    return this.http.post('http://35.227.64.60:3000/api/v1/performance', sturesponse).do(res => console.log(res));
  }

  getMessage(quesid){
    var dataObj = {
      func: 'getquestionbyid',
      qid: quesid
    };
    var form = new FormData();
    form.append("qid", "1802");
    form.append("func", "getquestionbyid");
    //defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
    //console.log(form);
    
    return this.http.post('http://msmypaper.com/mypaper/role_admin/mstestapi.php', dataObj, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
     .do(res => console.log(res));
//return this.http.get('http://msmypaper.com/mypaper/role_admin/functions.php').do(res => console.log(res));
    

  }
  getAllQuestions() {
    var dataObj = {
      func: 'viewsubject'
    };
  

    return this.http.post('http://msmypaper.com/mypaper/role_admin/mstestapi.php', dataObj, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      .do(res => console.log(res));


  }

  getChapters() {
  
    return this.http.get('http://35.227.64.60:3000/api/v1/chapters')
      .do(res => console.log(res));

  }
  getSubjects() {

    return this.http.get('http://35.227.64.60:3000/api/v1/subjects')
      .do(res => console.log(res));

  }
  getChapterDetails(ch_id) {

    return this.http.get('http://35.227.64.60:3000/api/v1/chapters/'+ch_id)
      .do(res => console.log(res));

  }
  getQuestionPaper() {

    return this.http.get('http://35.227.64.60:3000/api/v1/questionpaper')
      .do(res => console.log(res));

  }
  getQuestionPaperBySubject(subject) {

    return this.http.get('http://35.227.64.60:3000/api/v1/questionpaper/subject/'+subject)
      .do(res => console.log(res));

  }
  getQuestionPaperDetails(id) {

    return this.http.get('http://35.227.64.60:3000/api/v1/questionpaper/' + id)
      .do(res => console.log(res));

  }

  getquestionDetails(id){
    console.log("looking for ques id : "+id);
    
    return this.http.get('http://35.227.64.60:3000/api/v1/questions/' + id)
      .do(res => console.log(res));
  }

   
}
