import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { IonList, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  usuarios: Observable<any>;
  @ViewChild('lista', {static: true}) lista: IonList;

  constructor(private dataService: DataService, private toastController: ToastController) { }

  ngOnInit() {
    this.usuarios = this.dataService.getUsers();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  favorite(user) {
    this.presentToast('Se ha guardado en favoritos');
    this.lista.closeSlidingItems();
  }

  share(user) {
    this.presentToast('Compartido!');
    this.lista.closeSlidingItems();
  }

  borrar(user) {
    this.presentToast('Se ha borrado');
    this.lista.closeSlidingItems();
  }

}
