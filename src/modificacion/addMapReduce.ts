import {MapReduce} from './mapReduce';
/**
 * Clase add que se extiende de MapReduce y suma los elementos de un array
 */
export class AddMapReduce extends MapReduce {
  constructor(protected vector: number[], protected funcion: Function) {
    super(vector, funcion);
  }
  /**
   * Método que modifica cada elemento de un array, haciendo lo que la funcion
   * define
   */
  protected map() {
    for (let i = 0; i < this.vector.length; i++) {
      this.vector[i] = this.funcion(this.vector[i]);
    }
  }
  /**
   * Método que suma todos los elementos del array y lo devuelve en un solo
   * valor
   * @returns {result} Valor total de la suma
   */
  protected reduce(): number {
    let result = 0;
    this.vector.forEach((item) => {
      result += item;
    });
    return result;
  }
  /**
   * Método que confirma que se han hecho los cambios
   */
  protected afterMap(): void {
    console.log('Ya se han hecho los cambios');
  }
}

