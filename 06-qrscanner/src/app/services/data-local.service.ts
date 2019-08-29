import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];

  constructor(
    private storage: Storage,
    private navController: NavController,
    private inAppBrowser: InAppBrowser,
    private file: File
    ) {
    this.cargarStorage();
  }

  async cargarStorage() {
    this.registros = await this.storage.get('registros') || [];
  }

  async guardarRegistro(format: string, text: string) {
    await this.cargarStorage();

    const nuevoRegistro = new Registro(format, text);
    this.registros.unshift(nuevoRegistro);

    console.log(this.registros);
    this.storage.set('registros', this.registros);

    this.abrirRegistro(nuevoRegistro);
  }

  abrirRegistro(registro: Registro) {
    this.navController.navigateForward('/tabs/tab2');

    switch (registro.type) {
      case 'http':
        this.inAppBrowser.create(registro.text, '_system');
        break;
      case 'geo':
        this.navController.navigateForward(`tabs/tab2/mapa/${registro.text}`);
        break;
    }
  }

  enviarCorreo() {
    const arrTemp = [];
    const titulos = 'Tipo, Formato, Creado en, Texto \n';

    arrTemp.push(titulos);

    this.registros.forEach(registro => {
      const linea = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',', ' ')}\n`;
      arrTemp.push(linea);
    });

    console.log(arrTemp.join(''));
    this.crearArchvio(arrTemp.join(''));
  }

  crearArchvio(text: string) {
    this.file.checkFile(this.file.dataDirectory, 'registros.csv').then(exists => {
      console.log('Existe archivo?', exists);
      return this.escribirEnArchivo(text);
    }).catch(err => {
      return this.file.createFile(this.file.dataDirectory, 'registros.csv', false)
              .then(created => this.escribirEnArchivo(text))
              .catch(err2 => console.log('No se pudo crear el archivo', err2));
    });
  }

  async escribirEnArchivo(text: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, 'registros.csv', text);
    console.log('Archivo creado' + this.file.dataDirectory + 'registros.csv');
  }
}
