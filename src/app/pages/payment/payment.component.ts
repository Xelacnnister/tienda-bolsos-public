import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { render } from 'creditcardpayments/creditCardPayments';
import { CestaService } from '../../services/cesta.service';

@Component({
selector: 'app-pasarela',
templateUrl: './payment.component.html',
styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {

isLinear = false;
firstFormGroup: FormGroup;
secondFormGroup: FormGroup;
importePagar: number;
paid: boolean = false;
idDocumento: string = (localStorage.getItem('id') ) ? localStorage.getItem('id') : null;



constructor(
  private location: Location,
  private _formBuilder: FormBuilder,
  private db: AngularFirestore,
  private cestaServ: CestaService
  ) {
      
     }

     ngOnInit() {

      /// TENEIS QUE CARGAR EL OBSERVABLE DE DATASERVICE QUE SE ENCARGA DE GUARDAR EL DATO
      // DE EL IMPORTEFINAL A PAGAR.
      // Una vez tengais ese dato, teneis que guardarlo en una propiedad de la clase, y pasarselo
      // a la propiedad value del objeto que necesita paypal para procesar el pago
      
      this.cestaServ.importeFinal$.subscribe((imp: number)=>{
      this.importePagar = imp as any;
      })
      
      
      // cargais el pasarelaObject, le haceis un JSON.parse, y cada uno de los
      // datos lo vais poniendo en el formGroup, el nombre, direccion, telefono, emeila,
      //
      /* aqui tendre que cargar el dato de localStorage */
      
      
      const pasarelaObject = localStorage.getItem('pasarelaObject');
      const dataLoaded = pasarelaObject ? JSON.parse(pasarelaObject) : false;
      console.log('DATA LOADED', dataLoaded)

      this.firstFormGroup = this._formBuilder.group({
      nombre: [ dataLoaded ? dataLoaded.nombre : '' , [ Validators.required, Validators.maxLength(100) ] ] ,
      direccion: [ dataLoaded ? dataLoaded.direccion : '' , [ Validators.required, Validators.maxLength(1000) ] ],
      telefono: [ dataLoaded ? dataLoaded.telefono : '' , [ Validators.required ] ],
      email: [ dataLoaded ? dataLoaded.email : '', [ Validators.required, Validators.email ] ],
      });
      this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
      });
      }

      async simularPagoExitoso(){
        this.paid = true;
        const res = await this.db.collection('pedidos').doc(this.idDocumento).set({
        paid: true,
        precioFinal: this.importePagar,
        cestaCompra: this.cestaServ.getProductos()
        }, { merge: true } )
        console.log('RES', res)
        }
      
      ngAfterViewInit(){
        render({
        id: '#myPaypalButtons',
        currency: 'EUR',
        value: `${ this.importePagar }`,
        onApprove: (details)=>{
          console.log('COBRO EXITOSO', details);
          alert('COBRO EXITOSO');
          this.paid = true;
          this.db.collection('pedidos').doc(this.idDocumento).set({
            paid: true
          }, { merge: true })
        }
        })
      }
      
      get form(){
      return this.firstFormGroup.controls
      }   
    

  


    async guardar(){

      // JSON.stringify tendre que guardarlo el objeto en localStorage
      // {nombre, email, direccion, telefono} // pasarelaObject
      
      // 1. Extraer los datos del formulario.
      const data = this.firstFormGroup.getRawValue();
      // AQUI GUARDO EL DATO EN LOCALSTORAGE
      
      localStorage.setItem('pasarelaObject', JSON.stringify(data))
      
      
      // 2. Insertarlos en la base de datos.
      const idObject = await this.db.collection('pedidos').add(data);
      console.log('guardar', data)
      console.log('ID', idObject);
      this.idDocumento = idObject.id;
      localStorage.setItem('id', this.idDocumento)
      }
back(){
  this.location.back();
}
}