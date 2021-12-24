import { Injectable } from '@angular/core';
import { AngularFireMessaging } from "@angular/fire/compat/messaging";
import { getMessaging, getToken } from 'firebase/messaging';
import {BehaviorSubject} from "rxjs";
import firebase from "firebase/compat";
import MessagePayload = firebase.messaging.MessagePayload;

@Injectable()
export class MessagingService {

  $currentMessage: BehaviorSubject<MessagePayload> | undefined;

  constructor(private angularFireMessaging: AngularFireMessaging) {
    const messaging = getMessaging();
    getToken(messaging, {vapidKey: 'BISX-i4SSJZSdNrFd9KDLhFfCb3MlJLMpenvePFTSDyGhVLN6CROe6q2QHqkRMj7o9-_8kp4XrUw_QyJnIbDYWk'})
      .then((currentToken) => {
        if (currentToken) {
          // send token to server and update ui if necessary
        } else {
          // show permission request UI
          console.log('request permission do generate registration token');
        }
      }).catch((err) => {
      console.log('error while retrieving token', err);
    });
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload: MessagePayload) => {
        console.log("new message received. ", payload);
        if (!this.$currentMessage) this.$currentMessage = new BehaviorSubject(payload);
        this.$currentMessage.next(payload);
      })
  }
}
