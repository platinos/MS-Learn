import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
import { SchedulePage } from '../pages/schedule/schedule';
import { ScheduleFilterPage } from '../pages/schedule-filter/schedule-filter';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';
import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
import { SpeakerListPage } from '../pages/speaker-list/speaker-list';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { TestingapiPage } from '../pages/testingapi/testingapi';
import { TestingapidetailsPage } from '../pages/testingapidetails/testingapidetails';




// Main Pages
import { DashboardPage } from "../pages/dashboard/dashboard";
import { ScansPage } from '../pages/scans/scans';
import { ProfilePage } from "../pages/profile/profile";
import { AllTestsPage } from "../pages/all-tests/all-tests";
import { TalkPage } from "../pages/talk/talk";
import { StatsPage } from "../pages/stats/stats";




import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { MessageServiceProvider } from '../providers/message-service/message-service';
import { HttpClientModule } from "@angular/common/http";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { GroupdetailsPage } from '../pages/groupdetails/groupdetails';
import { TestsPage } from '../pages/tests/tests';

//import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    TestingapiPage,
    TestingapidetailsPage,
    AllTestsPage,
    DashboardPage,
    ScansPage,
    ProfilePage,
    TalkPage,
    StatsPage,
    GroupdetailsPage,
    TestsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: ScheduleFilterPage, name: 'ScheduleFilter', segment: 'scheduleFilter' },
        { component: SpeakerListPage, name: 'SpeakerList', segment: 'speakerList' },
        { component: SpeakerDetailPage, name: 'SpeakerDetail', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        // { component: AllTestsPage, name: 'AllTestsPage', segment: 'all-tests' },
        { component: TestingapiPage, name: 'testingapi', segment: 'testingapi' },
        { component: DashboardPage, name: 'Dashboard', segment: 'dashboard' },
        { component: ScansPage, name: 'Scans', segment: 'scans' },
        { component: ProfilePage, name: 'Profile', segment: 'profile' },
        // { component: AllTestsPage, name: 'Tests', segment: 'all-tests' },
        { component: TestsPage, name: 'Tests', segment: 'tests' },
        { component: TalkPage, name: 'Talk', segment: 'talks' },
        { component: GroupdetailsPage, name: 'GroupdetailsPage', segment: 'GroupdetailsPage/:group_id' },

        { component: TestingapidetailsPage, name: 'TestingapidetailsPage', segment: 'Testingapidetail/:ch_id' }
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    SchedulePage,
    ScheduleFilterPage,
    SessionDetailPage,
    SignupPage,
    SpeakerDetailPage,
    SpeakerListPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    TestingapiPage,
    TestingapidetailsPage,
    DashboardPage,
    ScansPage,
    ProfilePage,
    AllTestsPage,
    TalkPage,
    StatsPage,
    GroupdetailsPage,
    TestsPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    MessageServiceProvider,
    BarcodeScanner,
    Toast,
    DataServiceProvider,
    LocalNotifications
  ]
})
export class AppModule { }
