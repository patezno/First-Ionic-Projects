import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  constructor(
    private oneSignal: OneSignal
  ) { }

  configuracionInicial() {
    this.oneSignal.startInit('6659a6b8-8f6e-4d33-8f75-769b1eb8cdb5', '673811609783');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((noti) => {
      console.log('notificacion recibida', noti);
    });

    this.oneSignal.handleNotificationOpened().subscribe((noti) => {
      console.log('notificacion abierta', noti);
    });

    this.oneSignal.endInit();
  }
}
