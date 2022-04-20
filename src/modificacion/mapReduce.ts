/**
 * Clase abstracta que contiene los métodos reduce, map y afterMap
 */
export abstract class MapReduce {
  constructor(protected vector: number[], protected funcion: Function) {}
  public run() {
    this.map();
    this.afterMap();
    this.reduce();
  }
  /**
   * Método que modifica todos los valores de un array
   */
  protected map() {}
  /**
   * Método que confirma que se han hecMho los cambios
   */
  protected afterMap(): void {}
  /**
   * Método que reduce un array
   */
  protected abstract reduce(): number;
}
