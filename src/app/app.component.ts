import { Component, OnInit } from '@angular/core';
import { SwUpdate } from "@angular/service-worker";
import { TranslationService } from "./translation/translation.service";
import {MessagingService} from "./services/messaging.service";
import firebase from "firebase/compat";
import MessagePayload = firebase.messaging.MessagePayload;
import {AngularFireMessaging} from "@angular/fire/compat/messaging";
import {mergeMapTo} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = "WordProgressor";
  message: any;

  constructor(
    private swUpdate: SwUpdate,
    private translationService: TranslationService,
    private messagingService: MessagingService,
    private afMessaging: AngularFireMessaging,
  ) { }

  ngOnInit(): void {
    this.afMessaging.requestToken
      .subscribe(
        (token) => {console.log('Permission granted! Save to the server!', token); },
      (error) => { console.error(error); },
      )
   /*this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.$currentMessage?.subscribe((payload: MessagePayload) => {
      console.log(payload.data);
    });*/

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm(this.translationService.translate('msg_update_available'))) {
          window.location.reload();
        }
      })
    }
  }
}
