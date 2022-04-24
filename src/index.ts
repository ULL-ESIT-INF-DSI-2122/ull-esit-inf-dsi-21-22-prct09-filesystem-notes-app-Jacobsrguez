import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {Note} from './nota';
import {Method} from './method';

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
        // eslint-disable-next-line max-len
        console.log(new Method().edit(argv.user, argv.title, argv.body, argv.color));
      } else {
        console.log(chalk.red('El color debe ser red, green, yellow o blue'));
      }
    }
  },
});

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

yargs.command({
  command: 'read',
  describe: 'Muestra una cancions',
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

yargs.parse();
