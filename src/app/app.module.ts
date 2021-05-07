import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ProductsComponent } from './pages/products/products.component';
import {DetalleProductoComponent} from './pages/detail-products/detail-products.component';
import { PaymentComponent} from './pages/payment/payment.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatChipsModule} from '@angular/material/chips';
import { CarritoComponent } from './componentes/carrito/carrito.component';
import { ImportePagarComponent } from './componentes/importe-pagar/importe-pagar.component';
import { HeaderComponent } from './componentes/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FiltrosComponent } from './componentes/filtros/filtros.component';
import {MatSelectModule} from '@angular/material/select';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ComprobarSeleccionadoPipe } from './pipes/comprobar-seleccionado.pipe';
import { MostrarColorSeleccionadoPipe } from './pipes/mostrar-color-seleccionado.pipe';
import { HttpClientModule } from '@angular/common/http';
import { PruebaHttpComponent } from './pages/prueba-http/prueba-http.component';
import { AnimacionesComponent } from './pages/animaciones/animaciones.component';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ContactComponent,
    PaymentComponent,
    DetalleProductoComponent,
    CarritoComponent,
    ImportePagarComponent,
    HeaderComponent,
    FiltrosComponent,
    ComprobarSeleccionadoPipe,
    MostrarColorSeleccionadoPipe,
    PruebaHttpComponent,
    AnimacionesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // IMPORTS DE ANGULAR FIRE
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule,
    MatCardModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatChipsModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSelectModule,
    NgxSliderModule,
    HttpClientModule


     
  ],


    providers: [],
    bootstrap: [AppComponent],
  
})
export class AppModule { }
