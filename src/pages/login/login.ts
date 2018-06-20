import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController, MenuController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

import { TabsPage } from '../tabs-page/tabs-page';
import { SignupPage } from '../signup/signup';
//import { GooglePlus } from '@ionic-native/google-plus';
import { AuthService } from '../../providers/auth-service/auth.service';



@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '', email: '', pic:'' };
  submitted = false;


  // displayName: any;
  // email: any;
  // familyName: any;
  // givenName: any;
  // userId: any;
  // imageUrl: any;

  // isLoggedIn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public userData: UserData, 
    public menu: MenuController,
    private auth: AuthService
  //  private googlePlus: GooglePlus
  ) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.setRoot(TabsPage);
    }
  }
 

  // login() {
  //   this.googlePlus.login({})
  //     .then(res => {
  //       console.log(res);
  //       this.displayName = res.displayName;
  //       this.email = res.email;
  //       this.familyName = res.familyName;
  //       this.givenName = res.givenName;
  //       this.userId = res.userId;
  //       this.imageUrl = res.imageUrl;

  //       this.isLoggedIn = true;
  //       this.userData.login(res);
  //       this.navCtrl.setRoot(TabsPage);
  //     })
  //     .catch(err => console.error(err));
  // }

  // logout() {
  //   this.googlePlus.logout()
  //     .then(res => {
  //       console.log(res);
  //       this.displayName = "";
  //       this.email = "";
  //       this.familyName = "";
  //       this.givenName = "";
  //       this.userId = "";
  //       this.imageUrl = "";

  //       this.isLoggedIn = false;
  //     })
  //     .catch(err => console.error(err));
  // }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }
  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
    //
  }
  ionViewCanEnter(){
    this.navCtrl.popToRoot();
  }
  
  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
      () => {
              
              console.log(this.auth.afAuth.auth.currentUser.photoURL);
        
              this.login.username = this.auth.afAuth.auth.currentUser.displayName;
              this.login.email = this.auth.afAuth.auth.currentUser.email;
              this.login.pic = this.auth.afAuth.auth.currentUser.photoURL;
              this.userData.login(this.login);
              this.navCtrl.setRoot(TabsPage)
            },
        error => console.log(error.message)
      );
  }
}
