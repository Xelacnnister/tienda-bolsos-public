import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Filtro } from 'src/app/interfaces/filtro';
import { producto } from '../../interfaces/producto';
import { CestaService } from '../../services/cesta.service';
import { ColorService } from '../../services/color.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  mostrarFavorito: boolean = true;
  productos:producto[] = []
  productosMostrar: producto[] = []
  elementosFavoritos = (localStorage.getItem('elementosFavoritos') ) ? localStorage.getItem('elementosFavoritos').split(',') : [] ;
  colorSeleccionado = 'todos';


  constructor(
    private db: AngularFirestore,
    private router: Router,
    private cestaServ: CestaService,
    private colorServ: ColorService
    ) { }

  selectFavorite(producto: producto){

    //cuando seleccione aquí, quiero invertir el estado de mostrarFavorito
    console.log('MOSTRAR FAVORITO antes', this.mostrarFavorito);
    this.mostrarFavorito = !this.mostrarFavorito;
    console.log('MOSTRAR FAVORITO despues', this.mostrarFavorito);

    ( this.elementosFavoritos.indexOf(producto.url) < 0) ? this.elementosFavoritos.push(producto.url) : null;

    this.elementosFavoritos = [... this.elementosFavoritos];

    localStorage.setItem('elementosFavoritos', this.elementosFavoritos.toString())
    console.log('ELEMENTOS FAVORITOS', this.elementosFavoritos);
  }



  comprobarSiEstaSeleccionado(producto:producto){


    return (this.elementosFavoritos.indexOf(producto.url) >= 0);
    //quiero saber si el elemento esta dentro del array de favoritos y si esta que me diga TRUE

    //si no esta me devuelves un FALSE
  }



  deselectFavorite(producto:producto){

    //cuando seleccione aquí, quiero invertir el estado de mostrarFavorito

    console.log('MOSTRAR FAVORITO antes', this.mostrarFavorito);
    this.mostrarFavorito = !this.mostrarFavorito;
    console.log('MOSTRAR FAVORITO despues', this.mostrarFavorito);



    console.log('desseleccionar producto', producto);
    console.log('ID A DESSELECCIONAR', producto.url);

    const idProductoADeseleccionar = producto.url;// 'billetera-hombre'

    //1. ['brooklyn', 'neceser-carpincho', 'billetera-hombre'];

    const index = this.elementosFavoritos.indexOf(producto.url);

    //2. eliminarlo si existe en array;

    if( index >= 0 ){
      this.elementosFavoritos.splice(index, 1);

      this.elementosFavoritos = [... this.elementosFavoritos];

      localStorage.setItem('elementosFavoritos', this.elementosFavoritos.toString())

      //si el elemento esta en el array lo elimino
    }else{

      //si no está en el array, no hago nada
    }
    console.log(this.elementosFavoritos);
    
  }

  filtrarProductos(filtro: Filtro){
    console.log('filtro que viene del hijo', filtro);

    

    this.colorServ.setColor(this.colorSeleccionado)
    /// filtrar primero el texto
    const arrayFiltrandoTexto = this.filtrarTexto( this.productos, filtro);
    
    /// filtro el precio
    const arrayFiltrandoPrecio = this.filtrarPrecio( arrayFiltrandoTexto, filtro);
    
    /// filtro el color
    const arrayFiltrandoColor = this.filtrarColor( arrayFiltrandoPrecio, filtro);
    
    /// filtro el tipo
    const arrayFiltrandoTipo = this.filtrarTipo( arrayFiltrandoColor, filtro);
    
    this.colorSeleccionado = filtro.color;
    
    this.productosMostrar = [... arrayFiltrandoTipo];
    
    
    }
    
    
    filtrarTexto(array: producto[], filtro: Filtro): producto[]{
    const texto = filtro.texto;
    if(!texto){
    return array
    }else{
    return array.filter((producto: producto)=>{
    const nombre = producto.nombre.toLowerCase().trim()
    return nombre.includes(texto.toLowerCase().trim());
    })
    }
    }
    
    filtrarPrecio(array: producto[], filtro: Filtro): producto[]{
    console.log('FILTRO PRECIO', filtro)
    const precioMaximo = filtro.precio.precioMaximo;
    const precioMinimo = filtro.precio.precioMinimo;
    
    return array.filter((producto: any)=>{
    const precioDeEsteProducto = this.cestaServ.precioFinal(producto);
    return ( precioDeEsteProducto > precioMinimo ) && ( precioDeEsteProducto < precioMaximo)
    })
    }
    
    filtrarColor(array: producto[], filtro: Filtro): producto[]{
    const color = filtro.color
    
    if(!color || ( color === 'todos')){
    return array
    }else{
    return array.filter((producto: producto)=>{
    
    const arrayDeColoresDisponibles = producto.colores;

      // this.mostrarColor

    return arrayDeColoresDisponibles.includes(color)
    })
    }
    }

    // mostrarColor(producto:producto){
    //   if(this.colorSeleccionado === 'todos'){
    //   return producto.img[0]
    //   }else{
    //   return `${producto.url}_${this.colorSeleccionado}.jpeg`
    //   }
    //   }
  
    
    filtrarTipo(array: producto[], filtro: Filtro): producto[]{
    const tipo = filtro.tipo;
    if(!tipo  || ( tipo === 'todos')){
    return array
    }else{
    return array.filter((producto:producto)=>{
    return producto.tipo === tipo
    })
    }
    }

    ngOnInit(): void {
      this.db.collection('productos').valueChanges().subscribe(( res )=>{
      this.productos = res as producto[];
      this.filtrarProductos({
      precio:{
      precioMaximo: localStorage.getItem('precioMaximo') ? parseInt(localStorage.getItem('precioMaximo')) : 0,
      precioMinimo: localStorage.getItem('precioMinimo') ? parseInt(localStorage.getItem('precioMinimo')) : 100
      },
      tipo: localStorage.getItem('tipo') ? localStorage.getItem('tipo') : 'todos',
      color: localStorage.getItem('color') ? localStorage.getItem('color') : 'todos',
      texto: localStorage.getItem('texto') ? localStorage.getItem('texto') : null,
      });
      
      })
      }
      
      
  navegar(i){
    console.log('navegar', i);
    // this.router.navigate([ 'detail-products', i ]);

    this.router.navigate([ 'detail-products', i ])
  }
  

  

}

  
  
