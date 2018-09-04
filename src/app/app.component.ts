import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform, App, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
//import { AboutPage } from '../pages/about/about';
//import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
//import { MapPage } from '../pages/map/map';
import { SignupPage } from '../pages/signup/signup';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
//import { SchedulePage } from '../pages/schedule/schedule';
//import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { SupportPage } from '../pages/support/support';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
//import { TestingapiPage } from '../pages/testingapi/testingapi';
import { LocalNotifications } from '@ionic-native/local-notifications';
//import { AllTestsPage } from '../pages/all-tests/all-tests';
import { ScansPage } from '../pages/scans/scans';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { TestsPage } from '../pages/tests/tests';
import { ProfilePage } from '../pages/profile/profile';
//import { TalkPage } from '../pages/talk/talk';

//import { AuthService } from '../providers/auth-service/auth.service';

//import { Push, PushObject, PushOptions } from '@ionic-native/push';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html'
})
export class ConferenceApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu

  // appPages: PageInterface[] = [
  //   { title: 'Schedule', name: 'TabsPage', component: TabsPage, tabComponent: SchedulePage, index: 0, icon: 'calendar' },
  //   { title: 'Home', name: 'TabsPage', component: TabsPage, tabComponent: SpeakerListPage, index: 1, icon: 'contacts' },
  //   { title: 'Scan', name: 'TabsPage', component: TabsPage, tabComponent: ScansPage, index: 2, icon: 'qr-scanner' },
  //   { title: 'Map', name: 'TabsPage', component: TabsPage, tabComponent: MapPage, index: 7, icon: 'map' },
  //   { title: 'About', name: 'TabsPage', component: TabsPage, tabComponent: AboutPage, index: 3, icon: 'information-circle' },
  //   { title: 'testing Api', name: 'TabsPage', component: TestingapiPage, index: 5, icon: 'analytics' },
  //   { title: 'Available Tests', name: 'TabsPage', component: AllTestsPage, tabComponent: SchedulePage, index: 0, icon: 'help' }
  // ];

  userName: string  = '';
  userEmail: string = '';
  userPic: string = '../assets/img/speakers/face.jpg';

  loggedInPages: PageInterface[] = [
    { title: 'Dashboard', name: 'Dashboard', component: TabsPage, tabComponent: DashboardPage, index: 0, icon: 'speedometer' },
    { title: 'Scans', name: 'Scans', component: TabsPage, tabComponent: ScansPage, index: 1, icon: 'qr-scanner' },
    { title: 'Tests', name: 'Tests', component: TabsPage, tabComponent: TestsPage, index: 2, icon: 'time' },
    { title: 'Profile', name: 'AccountPage', component: TabsPage, tabComponent: ProfilePage, index: 3, icon: 'person' },
    //{ title: 'Talk', name: 'Talk', component: TabsPage, tabComponent: TalkPage, index: 4, icon: 'text' },
    //{ title: 'Support', name: 'SupportPage', component: TabsPage, tabComponent: SupportPage, index: 3, icon: 'help' },
    { title: 'Logout', name: 'TabsPage', component: TabsPage, icon: 'log-out', logsOut: true }
  ];
  loggedOutPages: PageInterface[] = [

    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
    { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
    { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
  ];
  rootPage: any;

  constructor(
    public events: Events,
    public userData: UserData,
    public menu: MenuController,
    public platform: Platform,
    public confData: ConferenceData,
    public storage: Storage,
    public splashScreen: SplashScreen,
    public localNotifications: LocalNotifications,
    public app: App,
    public alertCtrl: AlertController
    //private auth: AuthService
  ) {

    // Schedule delayed notification
    // this.localNotifications.schedule({
    //   text: 'You opened the app',
    //   at: new Date(new Date().getTime() + 100),
    //   led: 'FF0000', 
    //   sound:'file://sound.mp3',
    //   icon: 'home'
    // });
    // Check if the user has already seen the tutorial
    this.storage.get('hasSeenTutorial')
      .then((hasSeenTutorial) => {
        console.log(hasSeenTutorial);
        
        if (hasSeenTutorial === 'true') {
          this.userData.hasLoggedIn().then((hasLoggedIn) => {
            if(hasLoggedIn === true){
              this.rootPage = TabsPage;
               this.userData.getUsername().then((username) => {
                 this.userName = username;
                 console.log(this.userName);
                 
               });
              this.userData.getEmail().then((email) => {
                this.userEmail = email;
                console.log(email);
                
              });
              this.userData.getPic().then((pic) => {
                this.userPic = pic;
                console.log(pic);

              });
            }
            else{
            this.rootPage = LoginPage;
            }
          });
          
        } else {
          this.rootPage = TutorialPage;
        }
        
        this.platformReady()
      });

    
    // decide which menu items should be hidden by current login status stored in local storage
    this.userData.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot(TutorialPage);
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
      this.nav.setRoot(LoginPage);
      //this.app.getRootNav().setRoot(LoginPage);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    //this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      this.splashScreen.hide();
      //this.initPushNotification();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }


}
