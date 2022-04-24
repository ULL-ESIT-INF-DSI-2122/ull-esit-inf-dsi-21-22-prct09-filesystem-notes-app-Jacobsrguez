# Práctica Práctica 9 - Aplicación de procesamiento de notas de texto

## Datos
- Universidad de la Laguna
- Grado en Ingeniería Informática 
- Curso nº 3, segundo cuatrimestre
- Asignatura: Desarrollo en Sistemas Informáticos
- Fecha de entrega: 24/04/2022
- Jacob Santana Rodriguez
- alu0101330426@ull.edu.es

## Introduccion
En esta practica hay que implementar una aplicación de procesamiento de notas de texto. En concreto, la misma permitirá añadir, modificar, eliminar, listar y leer notas de un usuario concreto. Las notas se almacenarán como ficheros JSON en el sistema de ficheros de la máquina que ejecute la aplicación. Además, solo se podrá interactuar con la aplicación desde la línea de comandos.


## Resolucion 

Lo primero fue crear la clase note

``` typescript 
/**
 * Alias de tipo que identifica los colores de una nota.
 */
export type Color = 'red' | 'green' | 'yellow' | 'blue';

/**
 * Clase Note que representa una nota.
 */
export class Note {
  constructor(private title: string, private body: string,
  private color: Color) {}

  /**
   * Metodo que devuelve el titulo de la nota.
   * @returns {this.title} Titulo de la nota.
  */
  public getTitle(): string {
    return this.title;
  }

  /**
   * Metodo que devuelve el cuerpo de la nota.
   * @returns {this.body} Cuerpo de la nota.
   */
  public getBody(): string {
    return this.body;
  }

  /**
   * Metodo que devuelve el color de la nota.
   * @returns {this.color} Color de la nota.
   */
  public getColor(): Color {
    return this.color;
  }
  /**
   * Metodo que actualiza el titulo de la nota.
   * @param title Nuevo titulo de la nota que se le pasa por parametro
   */
  public setTitle(title: string): void {
    this.title = title;
  }

  /**
   * Metodo que actualiza el cuerpo de la nota.
   * @param body Nuevo cuerpo de la nota que se le pasa por parametro
   */
  public setBody(body: string): void {
    this.body = body;
  }

  /**
   * Metodo que actualiza el color de la nota.
   * @param color Nuevo color de la nota que se le pasa por parametro
   */
  public setColor(color: Color): void {
    this.color = color;
  }
}
``` 
Esta funcion se encarga de crear una nota, dicha nota contendra un titulo, un cuerpo y un color. Cada atributo tiene sus respectivos getters y setters.
Para lograr llevar a cabo cada comando, cree sus respectivos metodos dentro de la clase method. Estos metodos los ire explicando segun vaya enseñando los comandos

### Comando Add
``` typescript
yargs.command({
  command: 'add',
  describe: 'Añadir una nueva nota',
  builder: {
    user: {
      describe: 'Usuario de la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string'&& typeof argv.title === 'string' &&
    typeof argv.body === 'string' && typeof argv.color === 'string') {
      if (argv.color === 'red' || argv.color === 'green' ||
      argv.color === 'yellow' || argv.color === 'blue') {
        const nota = new Note(argv.title, argv.body, argv.color);
        console.log(new Method().add(nota, argv.user));
      } else {
        console.log(chalk.red('El color debe ser red, green, yellow o blue'));
      }
    }
  },
});
```
Usando la herramienta yargs añadimos un usuario propietario, el titulo de la nota, el body y el color. Esto por consolo siguiendo el siguiente esquema node dist/index.js add --user="Jacob" --title="prueba" --body="Hola esto es el body" --color="blue"

Luego en el handler añadimos el codigo del comando. Lo primero verificamos que el objeto usuario, title, ... sea de tipo string. Luego creamos un if que comprobamos que el color sea red, green, yellow o blue. Si no lo es muestro en rojo a traves del paquete chalk.
Si se cumple inicializo un objeto de la clase nota y luego llamo al add de la clase Method.

__El metodo add de la clase Method__
``` typescript 
public add(nota: Note, owner: string): void {
  if (!fs.existsSync(`./${owner}`)) {
      fs.mkdirSync(`./${owner}`);
  }
  if (!fs.existsSync(`./${owner}/${nota.getTitle()}.json`)) {
    fs.writeFileSync(`./${owner}/${nota.getTitle()}.json`, JSON.stringify(nota));
    console.log(chalk.green(`La Nota ${nota.getTitle()} ha sido creada con exito`));
  } else {
    console.log(chalk.red(`La Nota ${nota.getTitle()} ya existe`));
  }
}
```
El primer condicional compruebo si el directorio no existe, lo creo.
El segundo condicional verifica que si la nota no existe la cree y muestre por pantalla de color ver que la nota se ha creado y si no existe muestra de color rojo que la nota ya existe

### Comando edit
``` typescript
yargs.command({
  command: 'edit',
  describe: 'Modificar una nota existente',
  builder: {
    user: {
      describe: 'Usuario de la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Nuevo cuerpo de la nota',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Nuevo color de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string'&& typeof argv.title === 'string' &&
    typeof argv.body === 'string' && typeof argv.color === 'string') {
      if (argv.color === 'red' || argv.color === 'green' ||
      argv.color === 'yellow' || argv.color === 'blue') {
        console.log(new Method().edit(argv.user, argv.title, argv.body, argv.color));
      } else {
        console.log(chalk.red('El color debe ser red, green, yellow o blue'));
      }
    }
  },
});
```
En este metodo el esqueleto es basicamente el mismo al add pero algunos cambios. Cambie el comando por edit cambie los comentario de cada aributo y el bloque de codigo es igual pero no creo ningun objeto de la clase nota. Y llamo al metoddo edit, pasandole el usuario, el titulo de la nota, el body a cambiar y el color nuevo.

__El metodo edit de la clase method__
``` typescript
public edit(owner: string, title: string, body: string, color: Color): void {
  if (fs.existsSync(`./${owner}/${title}.json`)) {
    const nota = new Note(title, body, color);
    fs.writeFileSync(`./${owner}/${title}.json`, JSON.stringify(nota));
    console.log(chalk.green(`La Nota ${title} ha sido modificada con exito`));
  } else {
    console.log(chalk.red(`La Nota ${title} no existe`));
  }
}
```
Primer condicional compruebo si existe o no el archivo con el titulo que le pase. Si no existe imprimo en color rojo que el archivo no existe y si existe lo primero que hago es crear un objeto de la clase nota con el titulo original y con el body y el color nuevo. Lo escribo en el archivo con el comando fs.writeFileSync y luego muestro por pantalla un mensaje de color verde indicando que la nota se modifico con exito

### Metodo remove
Este metodo elimina una cancion. Al igual que en los demas comando el esqueleto es el mismo pero con una serie de cambios.

Esta vez, indico el dueño de la nota y el titulo de la nota a eliminar

``` typescript
yargs.command({
  command: 'remove',
  describe: 'Eliminar una nota',
  builder: {
    user: {
      describe: 'Usuario de la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string'&& typeof argv.title === 'string') {
      console.log(new Method().remove(argv.user, argv.title));
    }
  },
});
```
En el bloque de codigo lo unico que hago es llamar al metodo remove de la clase Method.

__Metodo Remove de la clase method__
``` typescript
public remove(owner: string, title: string): void {
  if (fs.existsSync(`./${owner}/${title}.json`)) {
    fs.rmSync(`./${owner}/${title}.json`);
    console.log(chalk.green(`La Nota ${title} ha sido eliminada con exito`));
  } else {
    console.log(chalk.red(`La Nota ${title} no existe`));
  }
}
```
Lo primero es verificar que el archivo que queremos eliminar existe. Si no existe imprimo un mensaje de color rojo indicando que no existe. 

Si el archivo existiese con el metodo fs.rmSync elimino la nota y ya solo falta imprimir que la nota ha sido borrada con exito

### Comando List

Este comando muestra todas las notas. Como con los demas comando el esqueleto es el mismo pero esta vez, solo introduzco el dueño de las notas
``` typescript
yargs.command({
  command: 'list',
  describe: 'Listar todas las notas',
  builder: {
    user: {
      describe: 'Usuario de la nota',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      console.log(new Method().list(argv.user));
    }
  },
});
```
En el bloque de codigo solo llamo al metodo de la clase list

__Metodo List__

Lo primero comprobar si el usuario existe o no. Como siempre usando el metodo fs.existsSync
si no existe se muestra un mensaje de color rojo que no existe.

Si existe creamos una variable files que va a contener al objeto dueño de la nota. Recorremos el objeto para recorrer todas sus notas con el foreach y vamos creando una variable que contenga cada nota del usuario y ya solo queda mostrar el titulo de cada nota
``` typescript 
public list(owner: string): void {
  if (fs.existsSync(`./${owner}`)) {
    const files = fs.readdirSync(`./${owner}`);
    files.forEach((file) => {
      const nota = JSON.parse(fs.readFileSync(`./${owner}/${file}`, 'utf8'));
      console.log(nota['title']);
    });
  } else {
    console.log(chalk.red(`El usuario ${owner} no existe`));
  }
}
``` 
### Comando Show

Este comando lee solo una nota. Como siempre el esqueleto es el mismo a los demas comandos pero esta vez introducimos el usuario de la nota y el titulo de la nota a buscar.
``` typescript
yargs.command({
  command: 'show',
  describe: 'Muestra una cancion',
  builder: {
    user: {
      describe: 'Usuario de la nota',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Titulo de la nota a buscar',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      console.log(new Method().read(argv.user, argv.title));
    }
  },
});
```
Como en los demas en el bloque de codigo llamo al metodo read de la clase method

__Metodo read__

Este metodo lo primero que hago es comprobar si la nota existe, si no se da el caso muestro en rojo que no existe. 
Si la nota existe, creo una variable nota que que va a contener una nota, gracias al metodo fs.readFileSync y al metodo Jspn.Parse que lo mapea a json y luego ya solo falta mostrar esa variable
``` typescript
public read(owner: string, title: string): void {
  if (fs.existsSync(`./${owner}/${title}.json`)) {
    const nota = JSON.parse(fs.readFileSync(`./${owner}/${title}.json`, 'utf8'));
    console.log(nota);
  } else {
    console.log(chalk.red(`La Nota ${title} no existe`));
  }
}
```


Ya por ultimo, toda la informacion de los metodos usados como el fd.existsSync, fs.writeFileSync... fueron sacados de la documentacion de node js y el esqueleto que uso en los comandos fue sacados de los apuntes del profe