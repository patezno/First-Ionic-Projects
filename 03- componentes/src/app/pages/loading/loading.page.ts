import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  loading: any;

  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
    setTimeout(() => {
      this.loading.dismiss();
    }, 1500);
    this.presentLoading('Espere');
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      message: mensaje
    });
    return await this.loading.present();
  }

}
