import {Note} from './nota';
import * as fs from 'fs';
import * as chalk from 'chalk';

export class Method {
  constructor() {}

  public add(nota: Note, owner: string): void {
    if (!fs.existsSync(`./${owner}`)) {
      fs.mkdirSync(`./${owner}`);
    }
    if (!fs.existsSync(`./${owner}/${nota.getTitle()}.json`)) {
      // eslint-disable-next-line max-len
      fs.writeFileSync(`./${owner}/${nota.getTitle()}.json`, JSON.stringify(nota));
      console.log(chalk.green(`La Nota ${nota.getTitle()} ha sido creada con exito`));
    } else {
      console.log(chalk.red(`La Nota ${nota.getTitle()} ya existe`));
    }
  }

  // public edit(title: string, owner: string, newBody: string,
  // newColor: string): void {
  // }

  public remove(owner: string, title: string): void {
    if (fs.existsSync(`./${owner}/${title}.json`)) {
      fs.rmSync(`./${owner}/${title}.json`);
      console.log(chalk.green(`La Nota ${title} ha sido eliminada con exito`));
    } else {
      console.log(chalk.red(`La Nota ${title} no existe`));
    }
  }
}
