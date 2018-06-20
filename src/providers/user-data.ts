import { Injectable } from '@angular/core';

import { Events, App} from 'ionic-angular';
import { Storage } from '@ionic/storage';
//import { NavController } from 'ionic-angular/navigation/nav-controller';


@Injectable()
export class UserData {
  _favorites: string[] = [];
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public events: Events,
    public storage: Storage,
    public app: App,
    
  ) {}

  hasFavorite(sessionName: string): boolean {
    return (this._favorites.indexOf(sessionName) > -1);
  };

  addFavorite(sessionName: string): void {
    this._favorites.push(sessionName);
  };

  removeFavorite(sessionName: string): void {
    let index = this._favorites.indexOf(sessionName);
    if (index > -1) {
      this._favorites.splice(index, 1);
    }
  };

  login(userData: any): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    //console.log(userData);
    
    this.setUsername(userData.username, userData.email, userData.pic);

    this.events.publish('user:login');
  };

  signup(username: string): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(username, '', '');
    this.events.publish('user:signup');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('username');
    this.storage.remove('email');
    this.events.publish('user:logout');
  };

  setUsername(username: string, email: string, pic: string): void {
    this.storage.set('username', username);
    this.storage.set('email', email);
    this.storage.set('pic', pic);
  };

  getUsername(): Promise<string> {
    return this.storage.get('username').then((value) => {
      return value;
    });
  };
  getEmail(): Promise<string> {
    return this.storage.get('email').then((value) => {
      return value;
    });
  };
  getPic(): Promise<string> {
    return this.storage.get('pic').then((value) => {
      return value;
    });
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

  checkHasSeenTutorial(): Promise<string> {
    return this.storage.get(this.HAS_SEEN_TUTORIAL).then((value) => {
      return value;
    });
  };
}
