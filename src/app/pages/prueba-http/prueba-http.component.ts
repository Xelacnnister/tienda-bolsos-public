import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../../services/http-client.service';

@Component({
  selector: 'app-prueba-http',
  templateUrl: './prueba-http.component.html',
  styleUrls: ['./prueba-http.component.scss']
})
export class PruebaHttpComponent implements OnInit {

  constructor(
    private http: HttpClientService
  ) { }

  ngOnInit(): void {
    this.http.get();

    this.http.post( { data: 1 } ).subscribe((res)=>{
      console.log('RESPUESTA POST', res);
      
      })
  }

}
