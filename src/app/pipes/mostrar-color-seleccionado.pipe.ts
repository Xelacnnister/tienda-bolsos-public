import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mostrarColorSeleccionado'
})
export class MostrarColorSeleccionadoPipe implements PipeTransform {

  transform(productos: unknown, ...args: unknown[]): unknown {
    let productoArray = productos as any;
    let colorSeleccionado = args[0];
    
    return `${productoArray.url}_${colorSeleccionado}.jpeg`;
  }

}
