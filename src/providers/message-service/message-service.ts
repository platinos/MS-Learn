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
    console.log('Hello MessageServiceProvider Provider');
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

}
