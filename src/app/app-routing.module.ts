import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { ProductsComponent } from './pages/products/products.component';
import { DetalleProductoComponent } from './pages/detail-products/detail-products.component';
import { PruebaHttpComponent } from './pages/prueba-http/prueba-http.component';
import { AnimacionesComponent } from './pages/animaciones/animaciones.component';

const routes: Routes = [

  {
    path:'',
    redirectTo: 'products',
    pathMatch:'full'
    },
    
    
    {
    path:'contact',
    component: ContactComponent
    },
    {
    path:'payment',
    component: PaymentComponent
    },
    {
    path:'products',
    component: ProductsComponent
    },
    {
    path:'detail-products/:id',
    component: DetalleProductoComponent
    },
    {
      path:'test',
      component: PruebaHttpComponent
    },
    {
      path:'animaciones',
      component: AnimacionesComponent
    },

    {
      path:'**',
      redirectTo: 'productos',
      pathMatch:'full'
    }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
