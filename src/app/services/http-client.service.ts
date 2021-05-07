import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, private afs: AngularFirestore) { }

  url = 'https://my-json-server.typicode.com/typicode/demo/posts'
  
  get(){//consultar datos
  return this.httpClient.get(this.url)
  }
  
  post(data){//enviar datos nuevos
  return this.httpClient.post(this.url, {
    modelo: 'Skoda',
    precio: 20000,
    anyo: 2009
  })//
  this.afs.collection('coches').add({})
  }
  
  delete(data){//eliminar datos/registros
  return this.httpClient.delete(this.url, data)
  }
  
  put(data){//actualizar o modificar un campo
  return this.httpClient.put(this.url, {data})
  }
}
