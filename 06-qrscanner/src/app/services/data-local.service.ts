import { Injectable } from '@angular/core';
import { Registro } from '../models/registro.model';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  registros: Registro[] = [];

  constructor(private storage: Storage) {
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
  }
}
