import {MapReduce} from './mapReduce';
/**
 * Clase sub que se extiende de la clase MapReduce y multiplica todos los
 * valores de un array
 */
export class SubMapReduce extends MapReduce {
  constructor(protected vector: number[], protected funcion: Function) {
    super(vector, funcion);
  }
  /**
   * Metodo que reduce a un valor los valores de un array
   * @returns {result} Contiene el valor del resultado
   */
  protected reduce(): number {
    let result = 0;
    this.vector.forEach((item) => {
      result *= item;
    });
    return result;
  }
}
