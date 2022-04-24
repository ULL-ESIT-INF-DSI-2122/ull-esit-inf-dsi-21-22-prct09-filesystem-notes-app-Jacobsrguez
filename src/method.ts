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
      // eslint-disable-next-line max-len
      console.log(chalk.green(`La Nota ${nota.getTitle()} ha sido creada con exito`));
    } else {
      console.log(chalk.red(`La Nota ${nota.getTitle()} ya existe`));
    }
  }

  public edit(owner: string, title: string, body: string, color: string): void {
    if (fs.existsSync(`./${owner}/${title}.json`)) {
      // eslint-disable-next-line max-len
      const nota = JSON.parse(fs.readFileSync(`./${owner}/${title}.json`, 'utf8'));
      nota.setBody(body);
      nota.setColor(color);
      fs.writeFileSync(`./${owner}/${title}.json`, JSON.stringify(nota));
      console.log(chalk.green(`La Nota ${title} ha sido modificada con exito`));
    } else {
      console.log(chalk.red(`La Nota ${title} no existe`));
    }
  }

  public remove(owner: string, title: string): void {
    if (fs.existsSync(`./${owner}/${title}.json`)) {
      fs.rmSync(`./${owner}/${title}.json`);
      console.log(chalk.green(`La Nota ${title} ha sido eliminada con exito`));
    } else {
      console.log(chalk.red(`La Nota ${title} no existe`));
    }
  }

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

  public read(owner: string, title: string): void {
    if (fs.existsSync(`./${owner}/${title}.json`)) {
      // eslint-disable-next-line max-len
      const nota = JSON.parse(fs.readFileSync(`./${owner}/${title}.json`, 'utf8'));
      console.log(nota);
    } else {
      console.log(chalk.red(`La Nota ${title} no existe`));
    }
  }
}
