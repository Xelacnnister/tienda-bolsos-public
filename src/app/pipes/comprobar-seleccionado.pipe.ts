import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'comprobarSeleccionado'
})
export class ComprobarSeleccionadoPipe implements PipeTransform {

    transform(value: unknown, ...args: unknown[]): unknown {

      // const arrayDeTodosLosFavoritos;
      // const elIdDeEsteProducto;
      
      let arrayDeElementosFavoritos = value as any;
      let productoUrl = args[0];
      let favorito = args[1];
      console.log('PARAMETROS DEL PIPE', {
      arrayDeElementosFavoritos, productoUrl
      })
      
      
      return ( arrayDeElementosFavoritos.indexOf(productoUrl) >= 0 ) ? favorito : !favorito //el return en los pipes es obligatorio, de lo contrario no devuelven nada
      }
  }


